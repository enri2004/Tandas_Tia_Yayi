import ModalMensaje from "@/components/modal_alert/modal";
import SocialAuthButtons from "@/components/login/SocialAuthButtons";
import Botones from "@/components/ui/bontones";
import Input from "@/components/ui/input";
import { iniciarSesionUsuario } from "@/utils/api/login-registrar/loginUser";
import { obtenerMensajeSocialAuth } from "@/utils/api/login-registrar/socialAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("Aviso");
  const [modalMensaje, setModalMensaje] = useState("");

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

  const manejarSocial = (provider: "google" | "facebook") => {
    mostrarModal(
      `${provider === "google" ? "Google" : "Facebook"} pendiente`,
      obtenerMensajeSocialAuth(provider, "login")
    );
  };

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      mostrarModal("Campos obligatorios", "Debes escribir tu correo y contraseña");
      return;
    }

    await iniciarSesionUsuario(
      { correo, password },
      {
        setLoading,
        onAdmin: () => router.replace("/admin/(tabs)"),
        onUsuario: () => router.push("/User/(tabs)"),
        onError: (mensaje) => mostrarModal("Error de inicio de sesión", mensaje),
      }
    );
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
                <Text style={[styles.title, { fontSize: titleSize }]}>
                  Bienvenidos
                </Text>
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
                    placeholder="correo"
                    value={correo}
                    onChange={setCorreo}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.input}>
                  <Input
                    placeholder="contraseña"
                    value={password}
                    onChange={setPassword}
                    secureTextEntry
                  />
                </View>

                <Botones
                  nombre={loading ? "Cargando..." : "Iniciar sesión"}
                  onPress={handleLogin}
                  style={styles.loginButton}
                  styletext={styles.loginButtonText}
                />

                <SocialAuthButtons
                  onGoogle={() => manejarSocial("google")}
                  onFacebook={() => manejarSocial("facebook")}
                />

                <View style={styles.row}>
                  <Text style={styles.textCuenta}>No tienes cuenta </Text>
                  <Botones
                    nombre="Crear cuenta"
                    onPress={() =>
                      router.push("/screen/Login-registre/registro")
                    }
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
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.6,
    shadowColor: "#000",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  loginButton: {
    width: "100%",
    minWidth: 190,
    backgroundColor: "#4285f4",
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
    color: "#4285F4",
    fontSize: 15,
    fontWeight: "700",
  },
});
