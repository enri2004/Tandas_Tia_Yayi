import React from "react";
import { Image, StyleSheet, Text,View } from "react-native";

export default function Imagen_Text(){
    return(
        <View style={styles.Padre}>
                <Image source={require("../../assets/images/Invitar.png")} style={styles.Imagen}/>
            <View style={styles.context}>
            <Text style={styles.titulo}>
                comparte esta app 
            </Text>
            <Text style={styles.subtitulo}>Invita a tus amigos a usar Tandas y Organiza tus ahorros Facilmente</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Padre:{
        flex:1,
         justifyContent:"center",
        alignItems:"center"
    },
    Imagen:{
        width:200,
        height:200,
        borderRadius:9999,
       padding:25,
    },
    context:{
    justifyContent:"center",
    alignItems:"center"
    },
    titulo:{
        fontSize:30,
        padding:10,
        fontWeight:"bold",
       
    },
    subtitulo:{
    textAlign: "center",
    color: "#555",
    marginBottom: 15,

    }

})