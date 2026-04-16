import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderDashboard from "../../../components/index/HeaderIndex";
import ActionButton from "../../../components/index/ActionButton";
import CardsDashboard from "../../../components/index/cards";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.imagen}
          />

          <View>
            <Text style={styles.saludo}>¡Hola, María! 👋</Text>
            <Text style={styles.fecha}>Miércoles, 15 Oct 2024</Text>
          </View>

          <Ionicons
            name="notifications-outline"
            size={26}
            onPress={() => router.push("/screen/user/notificaciones")} // ✅ corregido
          />
        </View>

        <CardsDashboard />

        <Text style={styles.sectionTitle}>Sección de Acciones Rápidas</Text>

        <View style={styles.actions}>
          <ActionButton
            icon={<Ionicons name="wallet" size={32} color="white" />}
            text="Realizar Pago"
            color="green"
            onPress={() => router.push("/screen/user/RegistroPagosUser")} // ⚠️ ajusta según tu estructura
          />

          <ActionButton
            icon={<Ionicons name="layers" size={32} color="white" />}
            text="Historial"
            color="#3b82f2"
            onPress={() => router.push("/screen/user/historial")} // ✅
          />

          <ActionButton
            icon={<Ionicons name="add-circle" size={32} color="white" />}
            text="Unirse a Tanda"
            color="orange"
            onPress={() => router.push("/screen/user/Unir_Tadas")} // ✅
          />

          <ActionButton
            icon={<Ionicons name="people" size={32} color="white" />}
            text="Invitar Amigos"
            color="#d017da"
            onPress={() => router.push("/screen/user/Invitar")} // ✅
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.sectionTitle}>Mis Tandas</Text>

          <View style={styles.tandaCard}>
            <Text style={styles.tandaTitle}>Tanda Oficina B</Text>
            <Text style={styles.estado}>Estado: Al día</Text>
          </View>

          <View style={styles.tandaCard}>
            <Text style={styles.tandaTitle}>Viaje a Cancún</Text>
            <Text style={styles.estado}>Estado: Próximo pago 18 Oct</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },

  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  tandaCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  tandaTitle: {
    fontWeight: "bold",
    fontSize: width * 0.04,
  },

  estado: {
    color: "green",
    marginTop: 4,
    fontSize: width * 0.035,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  saludo: { fontSize: 20, fontWeight: "bold" },
  fecha: { color: "gray" },
  imagen: { width: 60, height: 60, borderRadius: 999 },
});