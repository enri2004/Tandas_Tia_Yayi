import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HeaderTanda from "../../../components/detalles/HaderTandas";
import CardInfo from "../../../components/detalles/Cardinfo";
import CardProgreso from "../../../components/detalles/Cardprogreso";
import CardIntegrantes from "../../../components/detalles/Cardintegrantes";
import BotonesAccion from "../../../components/detalles/Botonesaccion";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetallesScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderTanda />
        <CardInfo />
        <CardProgreso />
        <CardIntegrantes />
        <BotonesAccion />
      </ScrollView>
    </View>
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f5f6fa"
  }
});