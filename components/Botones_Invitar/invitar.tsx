import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg"

export default function Qr(){
    return(
        <View   style={styles.qr}>
        <QRCode
        value="https://www.youtube.com/watch?v=QrKRccQvieA&list=RDEIJ8Wy1k_s0&index=12"
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
