import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Item from "./item";

type Props = {
  onOpenMetodosPago: () => void;
  onOpenHistorial: () => void;
  onOpenPrivacidad: () => void;
  onOpenAyuda: () => void;
  onOpenContacto: () => void;
};

export default function TandasSoporte({
  onOpenMetodosPago,
  onOpenHistorial,
  onOpenPrivacidad,
  onOpenAyuda,
  onOpenContacto,
}: Props) {
  return (
    <>
      <Text style={styles.section}>TANDAS</Text>

      <View style={styles.card}>
        <Item icon="card-outline" title="Metodos de pago" subtitle="Tus cuentas y tarjetas" onPress={onOpenMetodosPago} />
        <Item icon="time-outline" title="Historial" subtitle="Ver movimientos administrativos" onPress={onOpenHistorial} />
        <Item icon="shield-outline" title="Privacidad" subtitle="Control de datos y visibilidad" onPress={onOpenPrivacidad} />
      </View>

      <Text style={styles.section}>SOPORTE</Text>

      <View style={styles.card}>
        <Item icon="help-circle-outline" title="Ayuda" subtitle="Guia y preguntas" onPress={onOpenAyuda} />
        <Item icon="chatbubble-outline" title="Contacto" subtitle="Soporte tecnico" onPress={onOpenContacto} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#888",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
});
