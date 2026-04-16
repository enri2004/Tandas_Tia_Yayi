import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Item from "./item"

export default function Tandas_soport() {
  return (
    
<>
      {/* TANDAS */}
      <Text style={styles.section}>TANDAS</Text>

      <View style={styles.card}>
        <Item icon="card-outline" title="Métodos de pago" subtitle="Tus cuentas y tarjetas" />
        <Item icon="time-outline" title="Historial" subtitle="Ver todas tus tandas" />
        <Item icon="shield-outline" title="Privacidad" subtitle="Control de datos" />
      </View>

      {/* SOPORTE */}
      <Text style={styles.section}>SOPORTE</Text>

      <View style={styles.card}>
        <Item icon="help-circle-outline" title="Ayuda" subtitle="Guía y preguntas" />
        <Item icon="chatbubble-outline" title="Contacto" subtitle="Soporte técnico" />
      </View>
</>
  );
}



/* ESTILOS */
const styles = StyleSheet.create({
  


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