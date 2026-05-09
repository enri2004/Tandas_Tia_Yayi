import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "../ui/Input";

type Props = {
  icon: any;
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  multiline?: boolean;
};

export default function InputCard({
  icon,
  label,
  value,
  onChange,
  placeholder,
  keyboardType = "default",
  multiline = false,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name={icon} size={22} color="#1e73d8" />
        <Text style={styles.label}>{label}</Text>
      </View>

      <Input
        label=""
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        keyboardType={keyboardType}
        multiline={multiline}
        icon={icon}
        containerStyle={styles.inputContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8
  },
  label: {
    color: "#000"
  },
  inputContainer: {
    marginTop: 2,
  },
});
