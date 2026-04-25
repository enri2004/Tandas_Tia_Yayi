import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { NotificacionItem } from "../../utils/api/notificaciones/notificacionesApi";

type Props = {
  item: NotificacionItem;
  fecha: string;
  seleccionado: boolean;
  modoSeleccion: boolean;
  onPress: () => void;
  onLongPress: () => void;
  onDelete: () => void;
};

export default function NotificacionRow({
  item,
  fecha,
  seleccionado,
  modoSeleccion,
  onPress,
  onLongPress,
  onDelete,
}: Props) {
  const esWeb = Platform.OS === "web";

  const contenido = (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.card, seleccionado && styles.cardSelected]}
    >
      <View style={[styles.iconoBox, !item.leida && styles.iconoNuevo]}>
        <Text style={styles.iconoEmoji}>!</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.subtitulo}>{item.texto}</Text>
      </View>

      <View style={styles.right}>
        {seleccionado ? <View style={styles.checkCircle} /> : !item.leida ? <View style={styles.dot} /> : null}
        <Text style={styles.hora}>{fecha}</Text>
        <Text style={styles.tipo}>{item.tipo.replaceAll("_", " ")}</Text>
        {esWeb && !modoSeleccion ? (
          <Pressable style={styles.inlineDelete} onPress={onDelete}>
            <Text style={styles.inlineDeleteText}>Eliminar</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );

  if (esWeb) {
    return contenido;
  }

  return (
    <Swipeable
      enabled={!modoSeleccion}
      renderRightActions={() => (
        <Pressable style={styles.deleteAction} onPress={onDelete}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </Pressable>
      )}
    >
      {contenido}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
    width: "90%",
    padding: 20,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },
  iconoBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconoNuevo: {
    backgroundColor: "#dbeafe",
  },
  iconoEmoji: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitulo: {
    color: "#6b7280",
    marginTop: 4,
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
    marginLeft: 10,
  },
  hora: {
    fontSize: 12,
    color: "#888",
  },
  tipo: {
    fontSize: 11,
    color: "#3b82f6",
    textTransform: "capitalize",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3b82f6",
    marginBottom: 5,
  },
  checkCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3b82f6",
    marginBottom: 4,
  },
  deleteAction: {
    marginVertical: 6,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
  inlineDelete: {
    marginTop: 8,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  inlineDeleteText: {
    color: "#b91c1c",
    fontWeight: "700",
    fontSize: 12,
  },
});
