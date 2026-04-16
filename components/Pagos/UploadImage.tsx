import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👇 tipos
type Props = {
  imagen?: string; // puede venir o no
  onPress: (event: GestureResponderEvent) => void;
};

export default function UploadImage({ imagen, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      {imagen ? (
        <Image source={{ uri: imagen }} style={styles.preview} />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Ionicons name="cloud-upload-outline" size={30} color="#3b82f6" />
          <Text style={{ color: "#888", marginTop: 5 }}>
            Subir comprobante
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 120,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#3b82f6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  }
});