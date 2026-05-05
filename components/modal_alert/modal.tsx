import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  titulo: string;
  mensaje: string;
  textoBoton?: string;
  textoBotonSecundario?: string;
  onClose: () => void;
  onSecondaryAction?: () => void;
};

export default function ModalMensaje({
  visible,
  titulo,
  mensaje,
  textoBoton = "Aceptar",
  textoBotonSecundario,
  onClose,
  onSecondaryAction,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>

          <View style={styles.actions}>
            {textoBotonSecundario && onSecondaryAction ? (
              <TouchableOpacity
                style={[styles.boton, styles.botonSecundario]}
                onPress={onSecondaryAction}
              >
                <Text style={[styles.textoBoton, styles.textoBotonSecundario]}>
                  {textoBotonSecundario}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity style={styles.boton} onPress={onClose}>
              <Text style={styles.textoBoton}>{textoBoton}</Text>
            </TouchableOpacity>
          </View>
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
  actions: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },

  boton: {
    flex: 1,
    backgroundColor: "#4285F4",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  botonSecundario: {
    backgroundColor: "#e8f0fe",
  },

  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  textoBotonSecundario: {
    color: "#2563eb",
  },
});
