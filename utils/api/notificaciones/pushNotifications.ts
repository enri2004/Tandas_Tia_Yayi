import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import API, { API_URL } from "@/servers/Axios";
import {
  guardarExpoPushTokenLocal,
  obtenerExpoPushTokenLocal,
  obtenerToken,
  obtenerUsuarioGuardado,
} from "@/utils/api/login-registrar/authStorage";
import { registerPushToken } from "@/utils/notifications/registerPushToken";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const registrarDispositivoParaPush = async () => {
  const expoPushToken = await registerPushToken();

  if (expoPushToken) {
    await guardarExpoPushTokenLocal(expoPushToken);
    console.log("[Push] Expo Push Token guardado localmente");
  } else {
    console.log("[Push] No se obtuvo Expo Push Token para guardar localmente");
  }

  return {
    granted: Boolean(expoPushToken),
    expoPushToken,
    message: expoPushToken
      ? `ExpoPushToken generado: ${expoPushToken}`
      : "No se pudo generar ExpoPushToken.",
  };
};

export const guardarPushTokenEnBackend = async (expoPushToken: string, authToken?: string) => {
  const token = authToken || (await obtenerToken());
  console.log("[Push] JWT disponible para enviar token:", Boolean(token));
  console.log("[Push] Backend URL usada:", API.defaults.baseURL || API_URL);

  if (!token) {
    console.log("[Push] No hay JWT disponible, se omite envio al backend");
    return null;
  }

  const response = await API.post(
    "/User/push-token",
    { expoPushToken },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("[Push] Respuesta backend al guardar token:", response.data);
  return response.data;
};

export const sincronizarPushTokenConBackend = async (authToken?: string) => {
  const usuario = await obtenerUsuarioGuardado();
  console.log("[Push] Usuario en sesion para sincronizar:", usuario?.id || "SIN_SESION");

  if (!usuario?.id) {
    console.log("[Push] No existe sesion activa, no se enviara Expo Push Token");
    return false;
  }

  const expoPushToken = await obtenerExpoPushTokenLocal();
  console.log("[Push] Expo Push Token local encontrado:", expoPushToken || "VACIO");

  if (!expoPushToken) {
    console.log("[Push] No hay Expo Push Token local para sincronizar");
    return false;
  }

  const respuesta = await guardarPushTokenEnBackend(expoPushToken, authToken);
  console.log("[Push] expoPushTokens reportado por backend:", respuesta?.expoPushTokens);

  return true;
};
