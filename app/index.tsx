import ModalMensaje from "@/components/modal_alert/modal";
import SocialAuthButtons from "@/components/login/SocialAuthButtons";
import Botones from "@/components/ui/bontones";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import useFacebookAuth from "@/hooks/useFacebookAuth";
import useGoogleAuth from "@/hooks/Google";
import { iniciarSesionUsuario } from "@/utils/api/login-registrar/loginUser";
import {
  autenticarUsuarioSocial,
  actualizarRolPostSocial,
  cargarPerfilPostLogin,
  requiereCompletarPerfil,
  resolverRutaPorRol,
  SocialProvider,
} from "@/utils/api/login-registrar/socialAuth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type UsuarioAutenticado = {
  id: string;
  rol: "admin" | "usuario" | null;
  edad?: number | null;
  direccion?: string;
  telefono?: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { usuario: usuarioSesion, signIn, updateUser } = useAuth();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("Aviso");
  const [modalMensaje, setModalMensaje] = useState("");

  const [roleModalVisible, setRoleModalVisible] = useState(false);

  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isCompactHeight = height < 760;
  const availableHeight = Math.max(height - insets.top - insets.bottom, 640);

  const horizontalPadding = isMobile
    ? width * 0.08
    : isTablet
    ? width * 0.12
    : width * 0.18;

  const headerHeight = isCompactHeight ? 220 : isMobile ? 260 : isTablet ? 290 : 320;
  const titleSize = isMobile ? Math.min(width * 0.09, 34) : isTablet ? width * 0.058 : 46;
  const subtitleSize = isMobile ? Math.min(width * 0.043, 16) : isTablet ? width * 0.03 : 20;
  const cardWidth = isMobile ? "100%" : isTablet ? "82%" : 460;

  const mostrarModal = (titulo: string, mensaje: string) => {
    setModalTitulo(titulo);
    setModalMensaje(mensaje);
    setModalVisible(true);
  };

  const resolverPostLogin = async (usuario: UsuarioAutenticado) => {
    if (!usuario?.id) {
      mostrarModal("Error", "No se pudo identificar al usuario autenticado.");
      return;
    }

    if (!usuario.rol) {
      setRoleModalVisible(true);
      return;
    }

    const perfil = await cargarPerfilPostLogin(usuario.id);
    const usuarioCompleto = {
      ...usuario,
      ...perfil,
    };

    await updateUser(usuarioCompleto as any);

    if (requiereCompletarPerfil(usuarioCompleto)) {
      router.replace(resolverRutaPorRol(usuario.rol));
      return;
    }

    router.replace(resolverRutaPorRol(usuario.rol));
  };

  useEffect(() => {
    if (!usuarioSesion?.id) {
      return;
    }

    resolverPostLogin(usuarioSesion as UsuarioAutenticado).catch((error) => {
      console.log(error);
    });
  }, [usuarioSesion?.id, usuarioSesion?.rol]);

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      mostrarModal("Campos obligatorios", "Debes escribir tu correo y contraseña.");
      return;
    }

    await iniciarSesionUsuario(
      { correo, password },
      {
        setLoading,
        onResolved: async ({ usuario, token }) => {
          await signIn({ token, usuario });
          await resolverPostLogin(usuario);
        },
        onError: (mensaje) => mostrarModal("Error de inicio de sesión", mensaje),
      }
    );
  };

  const procesarSocial = async (provider: SocialProvider, perfil: any) => {
    const correoProveedor = perfil?.email?.trim?.();
    const nombreProveedor = perfil?.name?.trim?.() || perfil?.nombre?.trim?.();
    const fotoProveedor =
      provider === "google"
        ? perfil?.picture
        : perfil?.picture?.data?.url || perfil?.picture?.url;
    const facebookId = provider === "facebook" ? perfil?.id?.trim?.() || perfil?.id : undefined;

    console.log("[Social Auth] respuesta proveedor:", {
      provider,
      id: perfil?.id,
      name: perfil?.name,
      email: perfil?.email,
      picture: fotoProveedor,
    });

    if (!correoProveedor || !nombreProveedor) {
      mostrarModal(
        "Datos incompletos",
        provider === "facebook"
          ? "Facebook no devolvió un correo. Verifica tu cuenta o usa otro método de acceso."
          : "No fue posible obtener nombre y correo desde el proveedor seleccionado."
      );
      return;
    }

    try {
      setSocialLoading(provider);
      const respuesta = await autenticarUsuarioSocial(provider, {
        nombre: nombreProveedor,
        correo: correoProveedor,
        fotoPerfil: fotoProveedor || "",
        facebookId,
      });

      console.log("[Social Auth] respuesta backend:", {
        provider,
        tokenRecibido: !!respuesta?.token,
        userId: respuesta?.usuario?.id || respuesta?.usuario?._id,
        rol: respuesta?.usuario?.rol,
      });

      await signIn({
        token: respuesta.token,
        usuario: respuesta.usuario,
      });
      await resolverPostLogin(respuesta.usuario);
    } catch (error: any) {
      mostrarModal(
        "Error de autenticación",
        error?.response?.data?.mensaje || error?.message || "No se pudo completar el acceso social."
      );
    } finally {
      setSocialLoading(null);
    }
  };

  const { promptAsync: googlePrompt } = useGoogleAuth((user: any) => {
    procesarSocial("google", user);
  });

  const { promptAsync: facebookPrompt } = useFacebookAuth({
    onSuccess: (user) => {
      procesarSocial("facebook", user);
    },
    onError: (message) => {
      mostrarModal("Facebook", message);
    },
    onCancel: () => {
      console.log("[Facebook Auth] flujo cancelado sin mostrar modal.");
    },
  });

  const seleccionarRol = async (rol: "admin" | "user") => {
    try {
      setLoading(true);
      const respuesta = await actualizarRolPostSocial(rol);
      await signIn({
        token: respuesta.token,
        usuario: respuesta.usuario,
      });
      setRoleModalVisible(false);
      await resolverPostLogin(respuesta.usuario);
    } catch (error: any) {
      mostrarModal(
        "No se pudo guardar el rol",
        error?.response?.data?.mensaje || error?.message || "Intenta nuevamente"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: availableHeight,
            justifyContent: "center",
            paddingBottom: Math.max(insets.bottom, 16),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={[styles.header, { height: headerHeight }]}>
              <View style={styles.headerContent}>
                <Text style={[styles.title, { fontSize: titleSize }]}>Bienvenidos</Text>
                <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
                  Accede a tu cuenta
                </Text>
              </View>

              <View style={styles.waveContainer}>
                <View style={styles.wave} />
              </View>
            </View>

            <View
              style={[
                styles.formWrapper,
                {
                  paddingHorizontal: horizontalPadding,
                  marginTop: isCompactHeight ? -18 : -28,
                  paddingTop: isCompactHeight ? 0 : 8,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={[styles.formCard, { width: cardWidth }]}>
                <View style={styles.input}>
                  <Input
                    label="Correo o usuario"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={setCorreo}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    icon="mail-outline"
                  />
                </View>

                <View style={styles.input}>
                  <Input
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    value={password}
                    onChange={setPassword}
                    secureTextEntry
                    icon="lock-closed-outline"
                  />
                </View>

                <Botones
                  nombre={loading ? "Cargando..." : "Iniciar sesión"}
                  onPress={handleLogin}
                  style={styles.loginButton}
                  styletext={styles.loginButtonText}
                />

                {socialLoading ? (
                  <View style={styles.socialLoadingRow}>
                    <ActivityIndicator size="small" color="#1e73d8" />
                    <Text style={styles.socialLoadingText}>
                      Conectando con {socialLoading === "google" ? "Google" : "Facebook"}...
                    </Text>
                  </View>
                ) : null}

                <SocialAuthButtons
                  onGoogle={() => googlePrompt()}
                  onFacebook={() => facebookPrompt()}
                />

                <View style={styles.row}>
                  <Text style={styles.textCuenta}>No tienes cuenta </Text>
                  <Botones
                    nombre="Crear cuenta"
                    onPress={() => router.push("/screen/Login-registre/registro")}
                    style={styles.linkBtn}
                    styletext={styles.btnText}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalMensaje
        visible={modalVisible}
        titulo={modalTitulo}
        mensaje={modalMensaje}
        onClose={() => setModalVisible(false)}
      />

      <Modal transparent visible={roleModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.roleModalBox}>
            <Text style={styles.roleModalTitle}>¿Qué deseas hacer?</Text>
            <Text style={styles.roleModalText}>
              Elige cómo quieres usar Tandas Tía Yayi para terminar tu acceso.
            </Text>

            <Pressable
              style={[styles.roleOption, loading && styles.roleOptionDisabled]}
              disabled={loading}
              onPress={() => seleccionarRol("admin")}
            >
              <Text style={styles.roleOptionTitle}>Crear tandas</Text>
              <Text style={styles.roleOptionSubtitle}>Entrar como admin</Text>
            </Pressable>

            <Pressable
              style={[styles.roleOption, loading && styles.roleOptionDisabled]}
              disabled={loading}
              onPress={() => seleccionarRol("user")}
            >
              <Text style={styles.roleOptionTitle}>Unirse a tandas</Text>
              <Text style={styles.roleOptionSubtitle}>Entrar como usuario</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#1e73d8",
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 16,
    paddingBottom: 58,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    color: "#f3f3f3",
    fontWeight: "400",
    textAlign: "center",
  },
  waveContainer: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 94,
    justifyContent: "flex-end",
  },
  wave: {
    height: 78,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    transform: [{ scaleX: 1.08 }],
  },
  formWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
    minHeight: 300,
  },
  formCard: {
    alignItems: "center",
    maxWidth: 460,
    width: "100%",
  },
  input: {
    width: "100%",
    marginBottom: 14,
  },
  loginButton: {
    width: "100%",
    minWidth: 190,
    backgroundColor: "#1e73d8",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    marginTop: 6,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textCuenta: {
    color: "#444",
    fontSize: 15,
  },
  linkBtn: {
    backgroundColor: "transparent",
    padding: 0,
    marginLeft: 5,
  },
  btnText: {
    color: "#1e73d8",
    fontSize: 15,
    fontWeight: "700",
  },
  socialLoadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  socialLoadingText: {
    color: "#475569",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  roleModalBox: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
  },
  roleModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
  },
  roleModalText: {
    marginTop: 10,
    marginBottom: 18,
    color: "#475569",
    textAlign: "center",
    lineHeight: 21,
  },
  roleOption: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#f8fbff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  roleOptionDisabled: {
    opacity: 0.6,
  },
  roleOptionTitle: {
    color: "#1e3a8a",
    fontWeight: "700",
    fontSize: 16,
  },
  roleOptionSubtitle: {
    color: "#64748b",
    marginTop: 4,
  },
});





