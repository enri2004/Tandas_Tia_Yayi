import React from "react";
import { Pressable, Text, View, ViewStyle, StyleProp, TextStyle } from "react-native";

type Props = {
  nombre?: string; // opcional
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  styletext?: StyleProp<TextStyle>;
  children?: React.ReactNode; // 🔥 clave
};

export default function Boton({ nombre, onPress, style, styletext, children }: Props) {
  return (
    <View>
      <Pressable onPress={onPress} style={style}>
        {children ? (
          children
        ) : (
          <Text style={styletext}>{nombre}</Text>
        )}

      </Pressable>
    </View>
  );
}