import Cajatext from "../../../components/ui/Cajatext";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { id: "1", nombre: "Juan Pérez", fecha: "10 Marzo", estado: "pagado" },
  { id: "2", nombre: "Ana López", fecha: "17 Marzo", estado: "pendiente" },
  { id: "3", nombre: "Luis Torres", fecha: "24 Marzo", estado: "pendiente" },
  { id: "4", nombre: "Maria Ruiz", fecha: "31 Marzo", estado: "pendiente" },
];

export default function Turnos() {

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>

      {/* 🔷 HEADER */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Orden de Turnos</Text>
        <Text style={styles.subtitulo}>Tanda activa</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}

        renderItem={({ item, index }) => {

          const esActual = index === 1; // 👈 aquí cambias tu turno

          return (
            <Cajatext
              titulo={item.nombre}
              subtitulo={`Fecha: ${item.fecha}`}

              /* 🔢 CÍRCULO CON NÚMERO */
              icono={
                <View style={[
                  styles.circulo,
                  esActual && styles.turnoActual
                ]}>
                  <Text style={[
                    styles.numero,
                    esActual && { color: "white" }
                  ]}>
                    {index + 1}
                  </Text>
                </View>
              }

              /* 👉 ICONO DERECHA */
              derecha={
                <View style={styles.derecha}>

                  {item.estado === "pagado" ? (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={26}
                      color="#22c55e"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={26}
                      color="#f59e0b"
                    />
                  )}

                </View>
              }

              /* 💎 CARD DESTACADA */
              estiloExtra={esActual && styles.cardActual}
            />
          );
        }}
      />

    </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#f5f6fa"
},

/* HEADER */
header:{
  backgroundColor:"#3b82f6",
  padding:25,
  borderBottomLeftRadius:25,
  borderBottomRightRadius:25
},

titulo:{
  fontSize:22,
  fontWeight:"bold",
  color:"white"
},

subtitulo:{
  color:"#dbeafe",
  marginTop:5
},

/* CÍRCULO */
circulo:{
  width:40,
  height:40,
  borderRadius:20,
  backgroundColor:"#e5e7eb",
  justifyContent:"center",
  alignItems:"center",
  marginRight:10
},

turnoActual:{
  backgroundColor:"#3b82f6"
},

numero:{
  fontWeight:"bold",
  color:"#333"
},

/* DERECHA */
derecha:{
  justifyContent:"center",
  alignItems:"center"
},

/* CARD ACTUAL */
cardActual:{
  borderWidth:2,
  borderColor:"#3b82f6"
}

});