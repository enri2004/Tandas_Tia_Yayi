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

export default function Notificaciones() {
  return (
    <>
      <Text style={styles.section}>NOTIFICACIONES</Text>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={22} color="#666" />
            <View>
              <Text style={styles.text}>Activar notificaciones</Text>
              <Text style={styles.sub}>Avisos del sistema</Text>
            </View>
          </View>
          <Switch value={true} />
        </View>

        <Item icon="volume-high-outline" title="Sonidos" subtitle="Alertas sonoras" />
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


});