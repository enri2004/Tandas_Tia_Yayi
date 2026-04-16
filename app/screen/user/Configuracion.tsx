import React from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";

import HeaderConfig from "../../../components/Confi/HeaderConfi";
import ProfileCard from "../../../components/Confi/profileCard";
import OptionItem from "../../../components/Confi/optionItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfiguracionScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>

      <HeaderConfig />
      <ProfileCard />
      <Text style={styles.section}>CUENTA</Text>
      <OptionItem icon="person-outline" text="Editar perfil" />
      <OptionItem icon="lock-closed-outline" text="Cambiar contraseña" />
      <OptionItem icon="mail-outline" text="Correo electrónico" />
      <Text style={styles.section}>NOTIFICACIONES</Text>
      <OptionItem icon="notifications-outline" text="Activar notificaciones" hasSwitch />
      <OptionItem icon="volume-high-outline" text="Sonidos" />
      <Text style={styles.section}>TANDAS</Text>
      <OptionItem icon="card-outline" text="Métodos de pago" />
      <OptionItem icon="time-outline" text="Historial" />
      <OptionItem icon="shield-checkmark-outline" text="Privacidad" />
      <Text style={styles.section}>SOPORTE</Text>
      <OptionItem icon="help-circle-outline" text="Ayuda" />
      <OptionItem icon="chatbubble-outline" text="Contacto" />
      <OptionItem icon="information-circle-outline" text="Acerca de" />
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F5F5F5",
    padding:15
  },
  section:{
    marginTop:15,
    marginBottom:5,
    fontWeight:"bold",
    color:"#888"
  },
  logout:{
    backgroundColor:"#E74C3C",
    padding:15,
    borderRadius:12,
    alignItems:"center",
    marginTop:20
  },
  logoutText:{
    color:"#FFF",
    fontWeight:"bold"
  }
});