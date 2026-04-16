import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, Animated } from "react-native";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

type Props = {
  nombre: string;
  pago: string;
  participantes: number;
  turno: number;
  estado: string;
  imagen: any;
  tipo: "success" | "warning" | "danger";
  rol: "User" | "admin";
};

export default function CajaInput({
  nombre,
  pago,
  participantes,
  turno,
  estado,
  imagen,
  tipo,
  rol

}: Props) {

  const colores = {
    success: "#22c55e",   // verde
    warning: "#f59e0b",   // naranja
    danger: "#ef4444"     // rojo
  };
 const navigation = useNavigation();
  const colorLinea = colores[tipo];

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim,{
          toValue:1,
          duration:1000,
          useNativeDriver:false
        }),
        Animated.timing(anim,{
          toValue:0,
          duration:1000,
          useNativeDriver:false
        })
      ])
    ).start();
  },[]);


const irPantalla = () => {

    if(rol === "User"){
      router.push("/src/screen/user/detalles");
    }else{
      router.push("/");
    }

  };

  return (
    <View style={styles.card}>

      <Animated.View style={[styles.linea,{backgroundColor:colorLinea}]} />

      <Image source={imagen} style={styles.profile} />

      <View style={styles.info}>
        <View>
          <Text style={styles.titulo}>{nombre}</Text>
          <Text style={styles.texto}>Pago: {pago}</Text>
          <Text style={styles.texto}>Participantes: {participantes}</Text>
          <Text style={styles.texto}>Turno: #{turno}</Text>
          <Text style={styles.estado}>Estado: {estado}</Text>
        </View>

        <Pressable 
        onPress={irPantalla}
        style={styles.boton}
        >
          <Text style={styles.botonTexto}>
              {rol === "admin" ? "Administrar" : "Ver detalles"}
          </Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    width:"92%",
    backgroundColor:"white",
    borderRadius:20,
    padding:15,
    flexDirection:"row",
    marginVertical:10,
    alignSelf:"center",
  },

  linea:{
    width:8,
    height:"100%",
    borderRadius:5,
    marginLeft:-14,
    marginRight:10
  },

  profile:{
    width:70,
    height:70,
    marginRight:10,
    marginTop:"5%"
  },

  info:{
    flex:1,
    justifyContent:"space-between"
  },

  titulo:{
    fontWeight:"bold",
    fontSize:16
  },

  texto:{
    color:"#555"
  },

  estado:{
    color:"green",
    fontWeight:"bold"
  },

  boton:{
    alignSelf:"flex-end",
    backgroundColor:"#22c55e",
    paddingHorizontal:14,
    paddingVertical:8,
    borderRadius:10,
    marginTop:8
  },

  botonTexto:{
    color:"white",
    fontWeight:"bold"
  }
});