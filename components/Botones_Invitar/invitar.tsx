import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg"

export default function Qr(){
    return(
        <View   style={styles.qr}>
        <QRCode
        value="https://pagina-web-5394.onrender.com"
        size={250}
      
        />

        </View>
    )
}

const styles= StyleSheet.create({
    qr:{
        alignItems:"center",
        marginTop:10
    }
})
