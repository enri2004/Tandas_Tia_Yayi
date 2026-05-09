import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type Props = {
  Titulo: string;
  Participantes: number;
};

export default function HeaderTanda({ Titulo, Participantes }: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View
      style={[
        styles.header,
        {
          minHeight: isWide ? 188 : 168,
          paddingHorizontal: isWide ? 28 : 22,
          paddingTop: isWide ? 28 : 24,
          paddingBottom: isWide ? 56 : 48,
        },
      ]}
    >
      <Text style={styles.titulo}>{Titulo}</Text>
      <Text style={styles.subtitulo}>Activa • {Participantes} participantes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: "flex-start",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  subtitulo: {
    color: "#dbeafe",
    marginTop: 5,
  },
});
