
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Pag from "../../../components/Pagos_admin/Pagos_admin"


const data = [
  { id: "1", nombre: "Juan Pérez", tandas: "Tandas Yayi", pago: "$500", pendiente: "Pendiente" },
  { id: "2", nombre: "Juan Pérez", tandas: "Tandas Yayi", pago: "$500", pendiente: "Pendiente" },
  { id: "3", nombre: "Juan Pérez", tandas: "Tandas Yayi", pago: "$500", pendiente: "Pendiente" },
];

export default function Pagos() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pag
            nombre={item.nombre}
            tandas={item.tandas}
            pago={item.pago}
            pendiente={item.pendiente}
          />
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: "#f2f4f7",
  paddingTop: 10
},

card: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginVertical: 8,
  borderRadius: 16,
  padding: 15,
  elevation: 3
},

/* HEADER */
header: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10
},

avatar: {
  width: 55,
  height: 55,
  borderRadius: 100
},

headerText: {
  flex: 1,
  marginLeft: 10
},

nombre: {
  fontSize: 15,
  fontWeight: "600"
},

tanda: {
  fontSize: 12,
  color: "#777"
},

/* BADGE */
badge: {
  backgroundColor: "#fef3c7",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20
},

badgeText: {
  color: "#d97706",
  fontSize: 11,
  fontWeight: "bold"
},

/* BODY */
body: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10
},

label: {
  fontSize: 12,
  color: "#777"
},

pago: {
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 2
},

iconos: {
  flexDirection: "row",
  gap: 12
},

/* BOTÓN */
boton: {
  backgroundColor: "#22c55e",
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: "center"
},

textoBoton: {
  color: "#fff",
  fontWeight: "600"
}

});