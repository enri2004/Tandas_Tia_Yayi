import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useFocusEffect, useRouter } from "expo-router";

const obtenerCodigoDesdeTexto = (valor: string) => {
  if (!valor) {
    return "";
  }

  if (valor.startsWith("tandasapp://")) {
    try {
      const codigo = valor.split("codigo=")[1];
      return codigo ? decodeURIComponent(codigo) : "";
    } catch {
      return "";
    }
  }

  return valor.trim();
};

export default function Scanner() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [dataScanned, setDataScanned] = useState("");
  const [refresh, setRefresh] = useState(0);

  const scanLine = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestPermission();

    Animated.loop(
      Animated.timing(scanLine, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [requestPermission, scanLine]);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setDataScanned("");
      setRefresh((prev) => prev + 1);
    }, [])
  );

  if (!permission) return <Text>Cargando...</Text>;
  if (!permission.granted) return <Text>No hay permisos</Text>;

  const handleScan = async ({ data }: { data: string }) => {
    if (scanned) return;

    const codigo = obtenerCodigoDesdeTexto(data);

    setScanned(true);
    setDataScanned(codigo || data);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (codigo) {
      setTimeout(() => {
        router.replace(`/screen/user/Unir_Tadas?codigo=${encodeURIComponent(codigo)}`);
      }, 400);
      return;
    }

    setTimeout(() => {
      setScanned(false);
    }, 1500);
  };

  const translateY = scanLine.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        key={refresh}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY }] },
            ]}
          />

          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        {scanned && (
          <View style={styles.resultBox}>
            <Text style={{ color: "white" }}>Codigo detectado:</Text>
            <Text style={{ color: "#22c55e", marginTop: 5 }}>{dataScanned}</Text>

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
    overflow: "hidden",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#ef4444",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#22c55e",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#22c55e",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
