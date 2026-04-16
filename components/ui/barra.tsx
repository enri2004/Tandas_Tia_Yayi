import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

// Barra circular
export function Barra() {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Progress.Bar progress={0.3} width={200}
        height={10}
        color="green" />
    </View>
  );
}

// Otra barra circular
export function Barra_Circular() {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Progress.Circle size={80} progress={0.6} showsText={true} />
    </View>
  );
}