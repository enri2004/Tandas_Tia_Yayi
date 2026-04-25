import React, { useCallback, useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import HeaderConfig from "../../../components/Confi/HeaderConfi";
import ProfileCard from "../../../components/Confi/profileCard";
import OptionItem from "../../../components/Confi/optionItem";
import {
  cerrarSesion,
  obtenerUsuarioGuardado,
} from "../../../utils/api/login-registrar/authStorage";
import { cargarMiPerfil } from "../../../utils/api/amigos/amigosService";
import { Usuario } from "../../../utils/api/amigos/amigosTypes";

export default function ConfiguracionScreen() {
  const [perfil, setPerfil] = useState<Partial<Usuario> | null>(null);

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
    await cerrarSesion();
    Alert.alert("Sesion cerrada", "Tu sesion se cerro correctamente");
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderConfig />
        <ProfileCard
          perfil={perfil || undefined}
          onPress={() => router.push("/screen/user/perfil")}
        />

        <Text style={styles.section}>PERFIL</Text>
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
          text="Cambiar contrasena"
          onPress={() => router.push("/screen/user/cambiarPassword")}
        />
        <OptionItem
          icon="mail-unread-outline"
          text="Solicitudes de amistad"
          onPress={() => router.push("/screen/user/solicitudesAmistad")}
        />

        <Text style={styles.section}>NOTIFICACIONES</Text>
        <OptionItem
          icon="volume-high-outline"
          text="Sonidos"
          onPress={() => router.push("/screen/user/sonidos")}
        />

        <Text style={styles.section}>TANDAS</Text>
        <OptionItem
          icon="card-outline"
          text="Metodos de pago"
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

        <Text style={styles.section}>SOPORTE</Text>
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
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
