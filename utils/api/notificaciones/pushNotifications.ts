import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import API from "@/servers/Axios";
import {
  guardarExpoPushTokenLocal,
  obtenerExpoPushTokenLocal,
  obtenerUsuarioGuardado,
} from "@/utils/api/login-registrar/authStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const getProjectId = () =>
  Constants.easConfig?.projectId ??
  Constants.expoConfig?.extra?.eas?.projectId ??
  "";

export const registrarDispositivoParaPush = async () => {
  if (Platform.OS === "web") {
    return {
      granted: false,
      expoPushToken: "",
      message: "Las push notifications no se registran en web.",
    };
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return {
      granted: false,
      expoPushToken: "",
      message: `Permiso de notificaciones no concedido (${finalStatus}).`,
    };
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#3b82f6",
    });
  }

  const projectId = getProjectId();
  if (!projectId) {
    console.warn("No se encontro projectId de Expo/EAS para generar ExpoPushToken.");
    return {
      granted: true,
      expoPushToken: "",
      message: "No se encontro projectId de Expo/EAS.",
    };
  }

  const pushToken = await Notifications.getExpoPushTokenAsync({ projectId });
  const expoPushToken = pushToken.data;

  if (expoPushToken) {
    await guardarExpoPushTokenLocal(expoPushToken);
  }

  return {
    granted: true,
    expoPushToken,
    message: expoPushToken
      ? `ExpoPushToken generado: ${expoPushToken}`
      : "No se pudo generar ExpoPushToken.",
  };
};

export const sincronizarPushTokenConBackend = async () => {
  const usuario = await obtenerUsuarioGuardado();
  const expoPushToken = await obtenerExpoPushTokenLocal();

  if (!usuario?.id || !expoPushToken) {
    return false;
  }

  await API.put(`/User/${usuario.id}/push-token`, {
    expoPushToken,
    platform: Platform.OS,
  });

  return true;
};
