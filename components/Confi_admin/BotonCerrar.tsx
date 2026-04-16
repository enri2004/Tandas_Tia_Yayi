import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function BotonCerrar() {
  return (
  
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
        <Text style={styles.logoutSub}>Admin finaliza sesión</Text>
      </TouchableOpacity>

  );
}


/* ESTILOS */
const styles = StyleSheet.create({
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