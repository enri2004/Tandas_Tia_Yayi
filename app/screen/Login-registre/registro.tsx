import ModalMensaje from "@/components/modal_alert/modal";
import SocialAuthButtons from "@/components/login/SocialAuthButtons";
import Botones from "@/components/ui/bontones";
import Input from "@/components/ui/input";
import { registrarUsuario } from "@/utils/api/login-registrar/registrar";
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

type ErroresFormulario = {
  nombre: string;
  edad: string;
  correo: string;
  usuario: string;
  password: string;
  tipoUsuario: string;
};

export default function RegistroScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<"crear" | "unirse" | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("Registro exitoso");
  const [modalTexto, setModalTexto] = useState("Tu cuenta ha sido creada correctamente");

  const [errores, setErrores] = useState<ErroresFormulario>({
    nombre: "",
    edad: "",
    correo: "",
    usuario: "",
    password: "",
    tipoUsuario: "",
  });

  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isCompactHeight = height < 780;
  const availableHeight = Math.max(height - insets.top - insets.bottom, 680);

  const horizontalPadding = isMobile
    ? width * 0.08
    : isTablet
    ? width * 0.12
    : width * 0.18;

  const headerHeight = isCompactHeight ? height * 0.28 : height * 0.36;
  const titleSize = isMobile ? Math.min(width * 0.084, 32) : isTablet ? width * 0.06 : 46;
  const subtitleSize = isMobile ? Math.min(width * 0.04, 16) : isTablet ? width * 0.028 : 18;
  const cardWidth = isMobile ? "100%" : isTablet ? "82%" : 460;

  const limpiarFormulario = () => {
    setNombre("");
    setEdad("");
    setCorreo("");
    setUsuario("");
    setPassword("");
    setTipoUsuario(null);

    setErrores({
      nombre: "",
      edad: "",
      correo: "",
      usuario: "",
      password: "",
      tipoUsuario: "",
    });
  };

  const mostrarModal = (titulo: string, mensaje: string) => {
    setModalTitulo(titulo);
    setModalTexto(mensaje);
    setModalVisible(true);
  };

  const handleRegistro = () => {
    const nuevosErrores: ErroresFormulario = {
      nombre: "",
      edad: "",
      correo: "",
      usuario: "",
      password: "",
      tipoUsuario: "",
    };

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!edad.trim()) nuevosErrores.edad = "La edad es obligatoria";
    if (!correo.trim()) nuevosErrores.correo = "El correo es obligatorio";
    if (!usuario.trim()) nuevosErrores.usuario = "El usuario es obligatorio";
    if (!password.trim()) nuevosErrores.password = "La contraseña es obligatoria";
    if (!tipoUsuario) nuevosErrores.tipoUsuario = "Selecciona una opción";

    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((valor) => valor !== "");
    if (hayErrores) return;

    registrarUsuario(
      {
        nombre,
        edad,
        correo,
        usuario,
        password,
        tipoUsuario,
      },
      {
        setLoading,
        limpiarFormulario,
        onSuccess: () => {
          setModalTitulo("Registro exitoso");
          setModalTexto("Tu cuenta ha sido creada correctamente");
          setModalVisible(true);
        },
      }
    );
  };

  const manejarSocial = (provider: "google" | "facebook") => {
    mostrarModal(
      `${provider === "google" ? "Google" : "Facebook"} pendiente`,
      obtenerMensajeSocialAuth(provider, "registro")
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
            paddingBottom: Math.max(insets.bottom, 16),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={[styles.header, { height: headerHeight }]}>
              <View style={styles.headerContent}>
                <Text style={[styles.title, { fontSize: titleSize }]}>
                  Crear cuenta
                </Text>
                <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
                  Regístrate para continuar
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
                  marginTop: isCompactHeight ? -10 : -18,
                  paddingTop: isCompactHeight ? 8 : 18,
                  justifyContent: isCompactHeight ? "flex-start" : "center",
                },
              ]}
            >
              <View style={[styles.formCard, { width: cardWidth }]}>
                <View
                  style={[
                    styles.input,
                    errores.nombre ? styles.inputError : null,
                  ]}
                >
                  <Input
                    placeholder="nombre"
                    value={nombre}
                    onChange={(text: string) => {
                      setNombre(text);
                      setErrores((prev) => ({ ...prev, nombre: "" }));
                    }}
                  />
                </View>
                {errores.nombre ? (
                  <Text style={styles.errorText}>{errores.nombre}</Text>
                ) : null}

                <View
                  style={[
                    styles.input,
                    errores.edad ? styles.inputError : null,
                  ]}
                >
                  <Input
                    placeholder="edad"
                    value={edad}
                    onChange={(text: string) => {
                      setEdad(text);
                      setErrores((prev) => ({ ...prev, edad: "" }));
                    }}
                  />
                </View>
                {errores.edad ? (
                  <Text style={styles.errorText}>{errores.edad}</Text>
                ) : null}

                <View
                  style={[
                    styles.input,
                    errores.correo ? styles.inputError : null,
                  ]}
                >
                  <Input
                    placeholder="correo"
                    value={correo}
                    onChange={(text: string) => {
                      setCorreo(text);
                      setErrores((prev) => ({ ...prev, correo: "" }));
                    }}
                  />
                </View>
                {errores.correo ? (
                  <Text style={styles.errorText}>{errores.correo}</Text>
                ) : null}

                <View
                  style={[
                    styles.input,
                    errores.usuario ? styles.inputError : null,
                  ]}
                >
                  <Input
                    placeholder="usuario"
                    value={usuario}
                    onChange={(text: string) => {
                      setUsuario(text);
                      setErrores((prev) => ({ ...prev, usuario: "" }));
                    }}
                  />
                </View>
                {errores.usuario ? (
                  <Text style={styles.errorText}>{errores.usuario}</Text>
                ) : null}

                <View
                  style={[
                    styles.input,
                    errores.password ? styles.inputError : null,
                  ]}
                >
                  <Input
                    placeholder="contraseña"
                    value={password}
                    onChange={(text: string) => {
                      setPassword(text);
                      setErrores((prev) => ({ ...prev, password: "" }));
                    }}
                    secureTextEntry
                  />
                </View>
                {errores.password ? (
                  <Text style={styles.errorText}>{errores.password}</Text>
                ) : null}

                <Text style={styles.optionTitle}>¿Qué deseas hacer?</Text>

                <View style={styles.optionRow}>
                  <Botones
                    nombre="Crear tandas"
                    onPress={() => {
                      setTipoUsuario("crear");
                      setErrores((prev) => ({ ...prev, tipoUsuario: "" }));
                    }}
                    style={[
                      styles.optionButton,
                      tipoUsuario === "crear" && styles.optionButtonActive,
                      errores.tipoUsuario ? styles.optionButtonError : null,
                    ]}
                    styletext={[
                      styles.optionText,
                      tipoUsuario === "crear" && styles.optionTextActive,
                    ]}
                  />

                  <Botones
                    nombre="Unirse"
                    onPress={() => {
                      setTipoUsuario("unirse");
                      setErrores((prev) => ({ ...prev, tipoUsuario: "" }));
                    }}
                    style={[
                      styles.optionButton,
                      tipoUsuario === "unirse" && styles.optionButtonActive,
                      errores.tipoUsuario ? styles.optionButtonError : null,
                    ]}
                    styletext={[
                      styles.optionText,
                      tipoUsuario === "unirse" && styles.optionTextActive,
                    ]}
                  />
                </View>

                {errores.tipoUsuario ? (
                  <Text style={[styles.errorText, { textAlign: "center", paddingLeft: 0 }]}>
                    {errores.tipoUsuario}
                  </Text>
                ) : null}

                <Botones
                  nombre={loading ? "Registrando..." : "Registrarse"}
                  onPress={handleRegistro}
                  style={styles.registerButton}
                  styletext={styles.registerButtonText}
                />

                <SocialAuthButtons
                  onGoogle={() => manejarSocial("google")}
                  onFacebook={() => manejarSocial("facebook")}
                />

                <View style={styles.row}>
                  <Text style={styles.textCuenta}>¿Ya tienes cuenta? </Text>
                  <Botones
                    nombre="Iniciar sesión"
                    onPress={() => router.back()}
                    style={styles.linkBtn}
                    styletext={styles.btnText}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <ModalMensaje
          visible={modalVisible}
          titulo={modalTitulo}
          mensaje={modalTexto}
          textoBoton="Ir al inicio"
          onClose={() => {
            setModalVisible(false);
            if (modalTitulo.toLowerCase().includes("registro exitoso")) {
              router.back();
            }
          }}
        />
      </KeyboardAvoidingView>
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
    paddingTop: 10,
    paddingBottom: 48,
    zIndex: 2,
  },

  title: {
    color: "#fff",
    fontWeight: "300",
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
  },

  formCard: {
    alignItems: "center",
    maxWidth: 460,
    width: "100%",
  },

  input: {
    width: "100%",
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  inputError: {
    borderWidth: 1.5,
    borderColor: "#e53935",
  },

  errorText: {
    width: "100%",
    color: "#e53935",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 10,
    paddingLeft: 10,
  },

  optionTitle: {
    marginTop: 6,
    marginBottom: 12,
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
    textAlign: "center",
  },

  optionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  optionButton: {
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#4285f4",
    alignItems: "center",
    justifyContent: "center",
  },

  optionButtonActive: {
    backgroundColor: "#4285f4",
  },

  optionButtonError: {
    borderColor: "#e53935",
    borderWidth: 1.5,
  },

  optionText: {
    color: "#4285f4",
    fontSize: 15,
    fontWeight: "700",
  },

  optionTextActive: {
    color: "#fff",
  },

  registerButton: {
    width: "100%",
    minWidth: 190,
    backgroundColor: "#4285f4",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    marginTop: 4,
  },

  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
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

