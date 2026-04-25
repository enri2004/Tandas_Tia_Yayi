import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";

// 👇 tipos
type Props = {
  icon: ReactNode;
  text: string;
  color: string;
  onPress?:()=>void;
};
export default function ActionButton({ icon, text, color,onPress }: Props) {
  const { width, isTablet, isDesktop, bodySize } = useResponsive();
  const itemWidth = isDesktop ? width * 0.12 : isTablet ? width * 0.18 : width * 0.22;
  const iconSize = isDesktop ? width * 0.065 : isTablet ? width * 0.11 : width * 0.15;

  return (
    <TouchableOpacity style={[styles.action, { width: itemWidth }]} onPress={onPress}>
      <View style={[styles.icon, { backgroundColor: color, width: iconSize, height: iconSize }]}>
        {icon}
      </View>
      <Text style={[styles.text, { fontSize: bodySize }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action:{
    alignItems:"center",
  },
  icon:{
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    textAlign:"center",
    marginTop:6
  }
});
