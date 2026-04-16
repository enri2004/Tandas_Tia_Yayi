import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import InputCard from "../../../components/CreatTandasAdmin/InputCrads";
import FrecuenciaSelector from "../../../components/CreatTandasAdmin/FrecuenciasSelec";
import FechaSelector from "../../../components/CreatTandasAdmin/FechaSelector";
import BotonCrear from "../../../components/CreatTandasAdmin/BotonCrear";

export default function CrearTandaScreen() {

  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [participantes, setParticipantes] = useState("10");
  const [frecuencia, setFrecuencia] = useState("quincenal");
  const [fecha, setFecha] = useState("01/Nov/2026");

  const crearTanda = () => {
    if (!nombre || !monto) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    console.log({
      nombre,
      monto,
      participantes,
      frecuencia,
      fecha
    });

    Alert.alert("Éxito", "Tanda creada correctamente 🎉");
  };
  const seleccionarFecha = () => {
    Alert.alert("Fecha", "Aquí puedes abrir el calendario");
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CREAR NUEVA TANDA</Text>
      <InputCard
        icon="hourglass-outline"
        label="Nombre de la tanda"
        value={nombre}
        onChange={setNombre}
        placeholder="Ej: Tanda amigos"
      />
      <InputCard
        icon="cash-outline"
        label="Monto por participante"
        value={monto}
        onChange={setMonto}
        placeholder="$1,000 MXN"
      />
      <InputCard
        icon="people-outline"
        label="Número de participantes"
        value={participantes}
        onChange={setParticipantes}
      />
      <View style={styles.Contafrec}>
              {/* Frecuencia */}
      <Text style={styles.label}>Frecuencia</Text>
      <FrecuenciaSelector
        frecuencia={frecuencia}
        setFrecuencia={setFrecuencia}
      />
      <FechaSelector
        fecha={fecha}
        onPress={seleccionarFecha}
      />
</View>
      <BotonCrear onPress={crearTanda} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#f2f4f7"
  },

  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },

  label: {
    color: "#000",
    marginTop: 10
  },
Contafrec:{
  backgroundColor:"#fff"
}

});