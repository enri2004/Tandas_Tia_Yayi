import React, { useCallback, useState } from "react";
import ScreenSafeArea from "@/components/layout/ScreenSafeArea";
import { ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";

import ProfileCard from "../../../components/Confi/profileCard";
import OptionItem from "../../../components/Confi/optionItem";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import { useAuth } from "@/contexts/AuthContext";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import { cargarMiPerfil } from "../../../utils/api/amigos/amigosService";
import { Usuario } from "../../../utils/api/amigos/amigosTypes";

export default function ConfiguracionScreen() {
  const [perfil, setPerfil] = useState<Partial<Usuario> | null>(null);
  const { logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const cargarPerfil = async () => {
        try {
          const sesion = await obtenerUsuarioGuardado();
          if (!sesion?.id) return;
          const data = await cargarMiPerfil(sesion.id);
          setPerfil(data);
        } catch (error) {
          console.log(error);
        }
      };

      cargarPerfil();
    }, [])
  );

  const salir = async () => {
    await logout();
    Alert.alert("Sesión cerrada", "Tu sesión se cerró correctamente.");
  };

  return (
    <ScreenSafeArea hasBlueHeader backgroundColor="#F5F5F5">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Configuración"
          subtitle="Ajusta tu cuenta y preferencias"
        />
        <ProfileCard
          perfil={perfil || undefined}
          onPress={() => router.push("/screen/user/perfil")}
        />

        <Text style={styles.section}>Perfil</Text>
        <OptionItem
          icon="person-outline"
          text="Mi perfil"
          onPress={() => router.push("/screen/user/perfil")}
        />
        <OptionItem
          icon="mail-outline"
          text="Cambiar correo"
          onPress={() => router.push("/screen/user/cambiarCorreo")}
        />
        <OptionItem
          icon="lock-closed-outline"
          text="Cambiar contraseña"
          onPress={() => router.push("/screen/user/cambiarPassword")}
        />
        <OptionItem
          icon="mail-unread-outline"
          text="Solicitudes de amistad"
          onPress={() => router.push("/screen/user/solicitudesAmistad")}
        />

        <Text style={styles.section}>Notificaciones</Text>
        <OptionItem
          icon="volume-high-outline"
          text="Sonidos"
          onPress={() => router.push("/screen/user/sonidos")}
        />

        <Text style={styles.section}>Tandas</Text>
        <OptionItem
          icon="card-outline"
          text="Métodos de pago"
          onPress={() => router.push("/screen/user/metodosPago")}
        />
        <OptionItem
          icon="time-outline"
          text="Historial"
          onPress={() => router.push("/screen/user/historial")}
        />
        <OptionItem
          icon="shield-checkmark-outline"
          text="Privacidad"
          onPress={() => router.push("/screen/user/privacidad")}
        />

        <Text style={styles.section}>Soporte</Text>
        <OptionItem
          icon="help-circle-outline"
          text="Ayuda"
          onPress={() => router.push("/screen/user/ayuda")}
        />
        <OptionItem
          icon="chatbubble-outline"
          text="Contacto"
          onPress={() => router.push("/screen/user/contacto")}
        />
        <OptionItem
          icon="information-circle-outline"
          text="Acerca de"
          onPress={() => router.push("/screen/user/acerca")}
        />

        <TouchableOpacity style={styles.logout} onPress={salir}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenSafeArea>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  section: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#888",
  },
  logout: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
