import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const getProjectId = () =>
  Constants.expoConfig?.extra?.eas?.projectId ||
  Constants.easConfig?.projectId ||
  "";

export const registerPushToken = async () => {
  try {
    console.log("[Push] Iniciando registro de Expo Push Token");
    const executionEnvironment = Constants.executionEnvironment || "";
    const isExpoGoAndroid =
      Platform.OS === "android" && executionEnvironment === "storeClient";
    console.log("[Push] executionEnvironment:", executionEnvironment || "desconocido");

    if (Platform.OS === "web") {
      console.log("[Push] Web detectado, no se genera Expo Push Token");
      return null;
    }

    if (isExpoGoAndroid) {
      console.log(
        "[Push] Las push remotas no funcionan en Expo Go. Usa development build."
      );
      return null;
    }

    if (!Device.isDevice) {
      console.log("[Push] Las push notifications requieren dispositivo fisico");
      return null;
    }

    if (Platform.OS === "android") {
      console.log("[Push] Configurando canal Android");
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#3b82f6",
      });
    }

    const permisos = await Notifications.getPermissionsAsync();
    let finalStatus = permisos.status;
    console.log("[Push] Permiso actual:", finalStatus);

    if (finalStatus !== "granted") {
      const solicitud = await Notifications.requestPermissionsAsync();
      finalStatus = solicitud.status;
      console.log("[Push] Permiso despues de solicitar:", finalStatus);
    }

    if (finalStatus !== "granted") {
      console.log("[Push] Permiso de notificaciones denegado:", finalStatus);
      return null;
    }

    const projectId = getProjectId();
    console.log("[Push] projectId detectado:", projectId || "NO_ENCONTRADO");

    if (!projectId) {
      console.log("[Push] No se encontro projectId para Expo push");
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log("[Push] Expo Push Token obtenido:", token.data);

    return token.data;
  } catch (error) {
    console.log("[Push] Error al registrar push token:", error);
    return null;
  }
};
