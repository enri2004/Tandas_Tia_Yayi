import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
};

export default function BotonCerrar({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.logout} onPress={onPress}>
      <Text style={styles.logoutText}>Cerrar sesion</Text>
      <Text style={styles.logoutSub}>Admin finaliza sesion</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutSub: {
    color: "#FFF",
    fontSize: 12,
  },
});
