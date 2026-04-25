import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Item from "./item";

type Props = {
  notificacionesActivas: boolean;
  onToggleNotificaciones: (value: boolean) => void;
  onOpenSonidos: () => void;
};

export default function Notificaciones({
  notificacionesActivas,
  onToggleNotificaciones,
  onOpenSonidos,
}: Props) {
  return (
    <>
      <Text style={styles.section}>NOTIFICACIONES</Text>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={22} color="#666" />
            <View style={styles.textBox}>
              <Text style={styles.text}>Activar notificaciones</Text>
              <Text style={styles.sub}>Avisos del sistema y revisiones pendientes</Text>
            </View>
          </View>
          <Switch value={notificacionesActivas} onValueChange={onToggleNotificaciones} />
        </View>

        <Item
          icon="volume-high-outline"
          title="Sonidos"
          subtitle="Alertas sonoras del modulo admin"
          onPress={onOpenSonidos}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#888",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textBox: {
    marginLeft: 10,
    flex: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  text: {
    fontSize: 15,
    color: "#333",
  },
  sub: {
    fontSize: 12,
    color: "#777",
  },
});
