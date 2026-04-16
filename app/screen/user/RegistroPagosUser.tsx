import React, { useState } from "react";
import {
  View, Text, StyleSheet, TextInput,
  ScrollView, Alert
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import Select from "../../../components/Pagos/Select";
import MetodoPago from "../../../components/Pagos/MetodoPago";
import UploadImage from "../../../components/Pagos/UploadImage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistroPagoScreen() {

  // ✅ tipos correctos
  const [metodo, setMetodo] = useState<"transferencia" | "presencial">("transferencia");
  const [openSelect, setOpenSelect] = useState(false);
  const [tanda, setTanda] = useState("Seleccionar tanda");
  const [imagen, setImagen] = useState<string | null>(null);

  const tandas = ["Tanda Oficina", "Viaje Cancún", "Ahorro"];
  const seleccionarImagen = () => {
    Alert.alert("Imagen", "Selecciona", [
      { text: "Cámara", onPress: abrirCamara },
      { text: "Galería", onPress: abrirGaleria }
    ]);
  };
  const abrirCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) return;
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    if (!res.canceled) {
      setImagen(res.assets[0].uri);
    }
  };
  const abrirGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    if (!res.canceled) {
      setImagen(res.assets[0].uri);
    }
  };
  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.context}>
      <Text style={styles.title}>Registrar Pago</Text>
      </View>
      {/* SELECT */}
      <Select
        value={tanda}
        open={openSelect}
        setOpen={setOpenSelect}
        options={tandas}
        onSelect={(item: string) => {
          setTanda(item);
          setOpenSelect(false);
        }}
      />
      <MetodoPago metodo={metodo} setMetodo={setMetodo} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {metodo === "transferencia" && (
          <>
            <TextInput style={styles.input} placeholder="Banco" />
            <TextInput style={styles.input} placeholder="CLABE" />
            <TextInput style={styles.input} placeholder="Referencia" />

            <UploadImage imagen={imagen||undefined} onPress={seleccionarImagen} />
          </>
        )}
        {metodo === "presencial" && (
          <>
            <TextInput style={styles.input} placeholder="Monto" />
            <TextInput style={styles.input} placeholder="Persona" />
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa"
  },
  context:{
    backgroundColor:"#3b86f6",
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    padding:25
  },
  title: {
    color:"white",
    fontSize: 22,
    fontWeight: "bold",
    padding:10
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  }
});