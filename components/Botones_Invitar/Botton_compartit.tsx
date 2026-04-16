import React from "react";
import {  TouchableOpacity, Text, View, StyleSheet, Dimensions} from "react-native";



type Props={
text:String;
onPress:()=>void;
}

const {width} = Dimensions.get("window");
export default function Boton_Comp({text,onPress}:Props){
    return(
        <TouchableOpacity style={styles.Btn} onPress={onPress}>
            <View >
            <Text style={styles.Text}>
                {text}
            </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles=StyleSheet.create({
    Btn:{
        backgroundColor:"#3B82F6",
        borderRadius:4,
        width:width * 0.3,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:"10%"        
    },
    Text:{
        color:"white",
        fontSize:20,
        textAlign:"center"
    }
})