import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Gestion from "../../../components/Confi_admin/Gestion";
import Notificacion from "../../../components/Confi_admin/Notificaciones";
import Tandas_soport from "../../../components/Confi_admin/Tandas_soport";
import BotonCerrar from "../../../components/Confi_admin/BotonCerrar";
import ProfileCard from "../../../components/Confi_admin/profileCard copy";

export default function ConfigAdmin() {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.title}>Configuración de la app</Text>
      </View>
    <ProfileCard/>
     <Gestion/>
     <Notificacion/>
    <Tandas_soport/>
    <BotonCerrar/>
    </ScrollView>
  );
}


/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 15
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333"
  },

  section: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#888"
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 2
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },

  text: {
    fontSize: 15,
    color: "#333"
  },

  sub: {
    fontSize: 12,
    color: "#777"
  },

  logout: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20
  },

  logoutText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },

  logoutSub: {
    color: "#FFF",
    fontSize: 12
  }
});