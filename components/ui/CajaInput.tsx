import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id:string;
  nombre: string;
  pago: string;
  participantes: number;
  turno?: number | null;
  estado: string;
  imagen?: string;
  tipo: "success" | "warning" | "danger";
  rol: "User" | "admin";
};

export default function CajaInput({
  id,
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
  },[anim]);


const irPantalla = () => {
  if (rol === "User") {
    router.push({
      pathname: "/screen/user/detalles",
      params: { id },
    });
  } else {
    router.push({
      pathname: "/screen/admin/detalleTanda",
      params: { id },
    });
  }
  console.log(id)
};

   const esUrlValida =
    typeof imagen === "string" &&
    imagen.trim().length > 0 &&
    (imagen.startsWith("http://") || imagen.startsWith("https://"));

  const imageSource = esUrlValida
    ? { uri: imagen }
    : require("../../assets/images/icon.png");
  return (
    <View style={styles.card}>

      <Animated.View style={[styles.linea,{backgroundColor:colorLinea}]} />

      <Image source={imageSource} style={styles.profile} />

      <View style={styles.info}>
        <View>
          <Text style={styles.titulo}>{nombre}</Text>
          <Text style={styles.texto}>Pago: {pago}</Text>
          <Text style={styles.texto}>Participantes: {participantes}</Text>
          <Text style={styles.texto}>
            Turno: {typeof turno === "number" && turno > 0 ? `#${turno}` : "Pendiente"}
          </Text>
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
    marginTop:"5%",
    borderRadius:12
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
