import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function Input({ value, onChangeText }: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  const handleScan = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        alert("Permiso de camara requerido");
        return;
      }
    }

    router.push("/screen/user/scanner");
  };

  return (
    <View style={styles.conInput}>
      <Ionicons name="search" size={22} color="#555" />

      <TextInput
        placeholder="Buscar tanda o codigo"
        style={styles.input}
        value={value || ""}
        onChangeText={onChangeText || (() => {})}
      />

      <TouchableOpacity onPress={handleScan}>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});
