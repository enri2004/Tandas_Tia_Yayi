import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  titulo: string;
  mensaje: string;
  textoBoton?: string;
  onClose: () => void;
};

export default function ModalMensaje({
  visible,
  titulo,
  mensaje,
  textoBoton = "Aceptar",
  onClose,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>

          <TouchableOpacity style={styles.boton} onPress={onClose}>
            <Text style={styles.textoBoton}>{textoBoton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  box: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },

  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },

  mensaje: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  boton: {
    backgroundColor: "#4285F4",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    minWidth: 120,
    alignItems: "center",
  },

  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});