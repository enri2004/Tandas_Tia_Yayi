import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

// 👇 tipos
type Props = {
  icon: ReactNode;
  text: string;
  color: string;
  onPress?:()=>void;
};

const { width } = Dimensions.get("window");

export default function ActionButton({ icon, text, color,onPress }: Props) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <View style={[styles.icon, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action:{
    alignItems:"center",
    width:width*0.22,
  },
  icon:{
    width:width * 0.15,
    height:width * 0.15,
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:width*0.032,
    textAlign:"center",
    marginTop:6
  }
});