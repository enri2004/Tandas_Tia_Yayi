import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  placeholder?: string;
  onChange?: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export default function Input({
  placeholder,
  onChange,
  value,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={styles.input}
        placeholderTextColor="#7b8794"
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 0,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 6,
  },
});
