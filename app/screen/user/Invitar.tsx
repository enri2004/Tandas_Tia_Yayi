import React,{ useRef} from "react";
import { StyleSheet ,View, Text, Dimensions } from "react-native";
import Qr from "../../../components/Botones_Invitar/invitar"
import Boton_Comp from "../../../components/Botones_Invitar/Botton_compartit";
import Imagen_Text from "../../../components/Botones_Invitar/Imagen_text";
import { compartirLink,compartirQR } from "../../../utils/Compartir";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const {width} = Dimensions.get("window");


export default function Invitar(){
    const viewRef =useRef<View>(null);

    return(
    
    <SafeAreaView style={styles.Container}>
        <View style={styles.Text}>
        <Text style={styles.Titulo}>Invitar Amigos</Text>
        </View>
        <ScrollView>
         <View style={styles.wrapper}>
       <View style={styles.Caja}>
        <Imagen_Text/>
        <View ref={viewRef}>
        <Qr/>
        </View>
        <View style={styles.Boton}>
        <Boton_Comp text="Copiar link" onPress={compartirLink} />
        <Boton_Comp text="Compartir" onPress={()=>compartirQR(viewRef)}/>
        </View>
       </View>  
    </View>   
    </ScrollView>
    </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    Container:{
        flex:1,
       backgroundColor:"#f5f6fa"
    },
    Text:{
        backgroundColor:"#3b82f6",
        padding:25,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    Titulo:{
        fontSize:25,
        color:"white",
        fontWeight:"bold",
    },
    Boton:{
        flexDirection:"row",
        padding:10,
        gap:20,
        marginTop:12,
        marginLeft:-5
    },
    Caja:{
        marginVertical:6,
        marginHorizontal:16,
        width:width * 1,
        padding:20,
        alignSelf:"center",
        backgroundColor:"white",
        borderRadius:20,
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowColor:"#000",
        shadowOpacity:0.5
    },
     wrapper: {
    flex: 1,
    justifyContent: "center", // centra verticalmente
    alignItems: "center",     // centra horizontalmente
    padding: 20,
  },
})

