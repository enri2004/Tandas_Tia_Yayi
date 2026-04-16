import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image
} from "react-native";

// 🔥 DATA CORREGIDA (require en imagen)
const data = [
  {
    id: "1",
    imagen: require("../../assets/images/image.png"),
    nombre: "Tanda Finca",
    pago: "$500 MXN / Semanal",
    lugares: 3
  },
  {
    id: "2",
    imagen: require("../../assets/images/image.png"),
    nombre: "Tanda Finca 1",
    pago: "$500 MXN / Semanal",
    lugares: 3
  },
  {
    id: "3",
    imagen: require("../../assets/images/image.png"),
    nombre: "Tanda Finca 2",
    pago: "$500 MXN / Semanal",
    lugares: 3
  },
];

export default function ListaTandas() {
  return (
    <View style={styles.container}>

      <Text style={styles.section}>Tandas disponibles:</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>

            {/* ICONO */}
            <Image
              source={item.imagen}
              style={styles.icon}
            />

            {/* INFO */}
            <View style={{ flex: 1 }}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.pago}>{item.pago}</Text>
              <Text style={styles.lugares}>
                Lugares:{" "}
                <Text style={{ color: "green" }}>
                  {item.lugares} disponibles
                </Text>
              </Text>
            </View>

            {/* BOTÓN */}
            <Pressable style={styles.joinBtn}>
              <Text style={styles.joinText}>Unirme</Text>
            </Pressable>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    padding: 15,
    top:"10%"
  },

  section: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#F7F6F2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,

    // sombra Android
    elevation: 2,
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20, // 🔥 lo hace redondo
  },

  nombre: {
    fontWeight: "bold",
    fontSize: 14,
  },

  pago: {
    fontSize: 12,
    color: "#555",
  },

  lugares: {
    fontSize: 12,
  },

  joinBtn: {
    backgroundColor: "#22C55E",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  joinText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});