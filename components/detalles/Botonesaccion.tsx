// /components/detalles/BotonesAccion.tsx
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  tandaId?: string;
};

export default function BotonesAccion({ tandaId }: Props) {
  return (
    <>
      <View style={styles.botones}>
        <Pressable
          onPress={() =>
            tandaId
              ? router.push(`/screen/user/Turnos?id=${tandaId}`)
              : router.push("/screen/user/Turnos")
          }
          style={styles.boton}
        >
          <Text style={styles.textBtn}>Turnos</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            tandaId
              ? router.push(`/screen/user/CalendarioTanda?id=${tandaId}`)
              : router.push("/screen/user/CalendarioTanda")
          }
          style={styles.boton}
        >
          <Text style={styles.textBtn}>Calendario</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            tandaId
              ? router.push({
                  pathname: "/screen/user/historial",
                  params: { tandaId },
                })
              : router.push("/screen/user/historial")
          }
          style={styles.boton}
        >
          <Text style={styles.textBtn}>Historial</Text>
        </Pressable>
      </View>

      <Pressable style={styles.botonPago} onPress={()=>router.push("/screen/user/RegistroPagosUser")}>
        <Text style={styles.textPago}>Realizar Pago</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  botones:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
  },
  boton:{
    width:"32%",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:15,
    alignItems:"center",
    elevation:3
  },
  textBtn:{
    fontWeight:"600"
  },
  botonPago:{
    width:"100%",
    backgroundColor:"#22c55e",
    marginHorizontal:0,
    marginBottom:20,
    padding:18,
    borderRadius:15,
    alignItems:"center",
    elevation:4,
    marginTop:15
  },
  textPago:{
    color:"white",
    fontWeight:"bold",
    fontSize:16
  }
});
