import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  id: string;
  nombre: string;
  tandas: string;
  pago: string;
  pendiente: string;
};

const Pag = ({ id, nombre, tandas, pago, pendiente }: Props) => {
  return (
    <Swipeable>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.avatar}
          />

          <View style={styles.headerText}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.tanda}>Tanda: {tandas}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pendiente}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View>
            <Text style={styles.label}>Pago</Text>
            <Text style={styles.pago}>{pago}</Text>
          </View>

          <View style={styles.iconos}>
            <Ionicons name="document-text-outline" size={22} color="#f59e0b" />
            <Ionicons name="hourglass-outline" size={22} color="#f59e0b" />
          </View>
        </View>

        <Pressable
          style={styles.boton}
          onPress={() => router.push(`/screen/admin/ConfirmarPago?id=${id}`)}
        >
          <Text style={styles.textoBoton}>Revisar pago</Text>
        </Pressable>
      </View>
    </Swipeable>
  );
};

export default Pag;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 15,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  nombre: {
    fontSize: 15,
    fontWeight: "600",
  },
  tanda: {
    fontSize: 12,
    color: "#777",
  },
  badge: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#d97706",
    fontSize: 11,
    fontWeight: "bold",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#777",
  },
  pago: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  iconos: {
    flexDirection: "row",
    gap: 12,
  },
  boton: {
    backgroundColor: "#22c55e",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "600",
  },
});
