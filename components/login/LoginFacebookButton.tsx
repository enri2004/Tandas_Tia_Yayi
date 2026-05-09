import { Ionicons } from "@expo/vector-icons";
import React from "react";

import Botones from "../ui/bontones";

type Props = {
  onPress: () => void;
  style?: object;
};

export default function LoginFacebookButton({ onPress, style }: Props) {
  return (
    <Botones style={style} onPress={onPress}>
      <Ionicons name="logo-facebook" size={28} color="#1877F2" />
    </Botones>
  );
}
