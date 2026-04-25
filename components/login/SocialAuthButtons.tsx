import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Botones from "../ui/bontones";

type Props = {
  onGoogle: () => void;
  onFacebook: () => void;
};

export default function SocialAuthButtons({ onGoogle, onFacebook }: Props) {
  return (
    <>
      <Text style={styles.continueText}>o continuar con:</Text>

      <View style={styles.socialRow}>
        <Botones style={styles.socialButton} onPress={onGoogle}>
          <Ionicons name="logo-google" size={28} color="#DB4437" />
        </Botones>

        <Botones style={styles.socialButton} onPress={onFacebook}>
          <Ionicons name="logo-facebook" size={28} color="#1877F2" />
        </Botones>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  continueText: {
    marginTop: 18,
    marginBottom: 14,
    fontSize: 15,
    color: "#444",
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});
