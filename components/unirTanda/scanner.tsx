import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import * as Haptics from "expo-haptics";
import { Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function Scanner() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [dataScanned, setDataScanned] = useState("");
  const [refresh, setRefresh] = useState(0);

  const scanLine = useRef(new Animated.Value(0)).current;

  // 🔐 Permisos + animación
  useEffect(() => {
    requestPermission();

    Animated.loop(
      Animated.timing(scanLine, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  // 🔥 RESET cuando regresas a la pantalla
  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setDataScanned("");
      setRefresh(prev => prev + 1); // reinicia cámara
    }, [])
  );

  if (!permission) return <Text>Cargando...</Text>;
  if (!permission.granted) return <Text>No hay permisos</Text>;

const handleScan = async ({ data }) => {
  if (scanned) return;

  setScanned(true);
  setDataScanned(data);

  // vibración
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

  // abrir links
  if (data.startsWith("http://") || data.startsWith("https://")) {
    try {
      await Linking.openURL(data);
    } catch (error) {
      console.log("No se pudo abrir");
    }
  }

  // 🔥 REACTIVAR ESCÁNER AUTOMÁTICAMENTE
  setTimeout(() => {
    setScanned(false);
  }, 1500); // puedes ajustar tiempo
};

  const translateY = scanLine.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220]
  });

  return (
    <View style={{ flex: 1 }}>

      {/* 📷 Cámara */}
      <CameraView
        key={refresh}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* 🔲 Overlay */}
      <View style={styles.overlay}>

        <View style={styles.scanBox}>

          {/* 🔴 línea animada */}
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY }] }
            ]}
          />

          {/* 🟢 esquinas */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

        </View>

        {/* 📦 resultado */}
        {scanned && (
          <View style={styles.resultBox}>
            <Text style={{ color: "white" }}>QR detectado:</Text>
            <Text style={{ color: "#00FF99", marginTop: 5 }}>
              {dataScanned}
            </Text>

            {/* 🔄 botón para volver a escanear */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setScanned(false);
                setDataScanned("");
              }}
            >
              <Text style={{ color: "white" }}>Escanear otra vez</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  scanBox: {
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: "hidden"
  },

  scanLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "red"
  },

  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00FF99"
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4
  },

  resultBox: {
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  button: {
    marginTop: 10,
    backgroundColor: "#00FF99",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8
  }

});