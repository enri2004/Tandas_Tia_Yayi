import React from "react";
import { View,Text, StyleSheet, FlatList } from "react-native";
import Input from "../../../components/unirTanda/Input";
import ListaTandas from "../../../components/unirTanda/ListaTandas";

const data = [
  {id:"1", nombre:"Tanda Finca Cafetal", pago:"$1250 Mxn(quincenal)", participantes:10,estado:"Activa-Pendiente", imagen:require("../../../assets/images/icon.png"), tipo:"success", rol:"User"},
  {id:"2", nombre:"Tanda Finca Cafetal", pago:"$1250 Mxn(quincenal)", participantes:10, turno:4, estado:"Activa-Pendiente", imagen:require("../../../assets/images/icon.png"), tipo:"danger", rol:"User"},
  {id:"3", nombre:"Tanda Finca Cafetal", pago:"$1250 Mxn(quincenal)", participantes:10, turno:4, estado:"Activa-Pendiente", imagen:require("../../../assets/images/icon.png"), tipo:"success", rol:"User"},
  {id:"4", nombre:"Tanda Finca Cafetal", pago:"$1250 Mxn(quincenal)", participantes:10, turno:4, estado:"Activa-Pendiente", imagen:require("../../../assets/images/icon.png"), tipo:"warning", rol:"User"},
  {id:"5", nombre:"Tanda Finca Cafetal", pago:"$1250 Mxn(quincenal)", participantes:10, turno:4, estado:"Activa-Pendiente", imagen:require("../../../assets/images/icon.png"), tipo:"success", rol:"User"},
];



export default function Unir_Tanda(){
    return(
        <View>
            <View style={styles.ConText}>
                <Text style={styles.Titulo}>Unir A Una Tanda</Text>
            </View>
            <View>
                <Input/>
            </View>
            <View>
            <ListaTandas/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
    },
    ConText:{
        backgroundColor:"#3b82f6",
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        padding:25
    },
    Titulo:{
        fontSize:25,
        fontWeight:"bold",
        color:"white"
    }
})