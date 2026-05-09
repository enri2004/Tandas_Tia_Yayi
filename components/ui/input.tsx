import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  multiline?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  editable?: boolean;
};

export default function Input({
  label,
  placeholder,
  onChange,
  value,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  icon,
  error,
  multiline = false,
  containerStyle,
  inputStyle,
  editable = true,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputShell,
          focused && styles.inputShellFocused,
          error ? styles.inputShellError : null,
          !editable ? styles.inputShellDisabled : null,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? "#1e73d8" : "#7b8794"}
            style={styles.icon}
          />
        ) : null}

        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, multiline && styles.inputMultiline, inputStyle]}
          placeholderTextColor="#94a3b8"
          underlineColorAndroid="transparent"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          editable={editable}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputShell: {
    width: "100%",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  inputShellFocused: {
    borderColor: "#1e73d8",
    shadowColor: "#1e73d8",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputShellError: {
    borderColor: "#dc2626",
  },
  inputShellDisabled: {
    opacity: 0.8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
    paddingVertical: 14,
  },
  inputMultiline: {
    minHeight: 110,
  },
  error: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
    paddingLeft: 4,
  },
});
