import { useEffect } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import {
  registrarDispositivoParaPush,
  sincronizarPushTokenConBackend,
} from "@/utils/api/notificaciones/pushNotifications";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";

export const usePushNotifications = () => {
  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        const result = await registrarDispositivoParaPush();
        const usuario = await obtenerUsuarioGuardado();

        if (__DEV__) {
          Alert.alert(
            "Push debug",
            result.message || "Sin mensaje de depuracion para push."
          );
        }

        if (mounted && usuario?.id) {
          await sincronizarPushTokenConBackend();
        }
      } catch (error) {
        console.log("No se pudo inicializar push notifications", error);
      }
    };

    bootstrap();

    const subscription = Notifications.addNotificationResponseReceivedListener(async () => {
      await sincronizarPushTokenConBackend();
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);
};
