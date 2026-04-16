import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Hader from "../../../components/indexadmin/HarderIndexadmin";
import CardResumen from "../../../components/indexadmin/CardsAdmin";
import ListaTandas from "../../../components/indexadmin/ListaTandas";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
        <Hader/>

        <CardResumen/>
      <Text style={styles.section}>Tandas activas</Text>
      <ListaTandas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f2f2f2", flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { color: "gray" },
  cardsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
});