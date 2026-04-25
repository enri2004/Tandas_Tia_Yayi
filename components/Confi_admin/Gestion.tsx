import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import Item from "./item";

export default function Gestion() {
  return (
    <View>
      <Text style={styles.section}>GESTION DE TANDAS</Text>

      <View style={styles.card}>
        <Item
          icon="people-outline"
          title="Usuarios"
          subtitle="Buscar perfiles y enviar solicitudes"
          onPress={() => router.push("/screen/admin/Invitar")}
        />
        <Item
          icon="book-outline"
          title="Reglas de tandas"
          subtitle="Definir normas y parametros"
          onPress={() => router.push("/screen/admin/reglasTandas")}
        />
        <Item
          icon="cash-outline"
          title="Montos minimos"
          subtitle="Establecer limites de cobro"
          onPress={() => router.push("/screen/admin/montosMinimos")}
        />
        <Item
          icon="settings-outline"
          title="Administracion general"
          subtitle="Control global de la tanda"
          onPress={() => router.push("/screen/admin/administracionGeneral")}
        />
      </View>
    </View>
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
});
