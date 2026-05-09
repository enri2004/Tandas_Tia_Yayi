import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useResponsive } from "../../hooks/useResponsive";
import UserAvatar from "../ui/UserAvatar";

type Props = {
  adminName?: string;
  notificacionesSinLeer?: number;
  fotoPerfil?: string;
};

export default function HeaderIndexAdmin({
  adminName = "Administrador",
  notificacionesSinLeer = 0,
  fotoPerfil = "",
}: Props) {
  const navigation = useRouter();
  const { titleSize, subtitleSize, isSmallPhone } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Pressable onPress={() => navigation.push("/screen/admin/perfil")}>
          <UserAvatar uri={fotoPerfil} size={56} />
        </Pressable>

        <View style={styles.textBlock}>
          <Text style={[styles.title, { fontSize: titleSize }]}>Hola, {adminName}</Text>
          <Text style={[styles.subtitle, { fontSize: subtitleSize }]} numberOfLines={isSmallPhone ? 3 : 2}>
            Resumen real de tus tandas y revisiones pendientes
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.notificationButton}
        onPress={() => router.push("/screen/admin/notificaciones")}
      >
        <Ionicons name="notifications-outline" size={24} color="#111827" />
        {notificacionesSinLeer > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificacionesSinLeer > 9 ? "9+" : notificacionesSinLeer}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#1e73d8",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    color: "#dbeafe",
    marginTop: 6,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    elevation: 2,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
