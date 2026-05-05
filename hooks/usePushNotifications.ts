import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import {
  registrarDispositivoParaPush,
  sincronizarPushTokenConBackend,
} from "@/utils/api/notificaciones/pushNotifications";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";

const manejarNotificacion = async (data: Record<string, any>) => {
  const usuario = await obtenerUsuarioGuardado();
  const rol = usuario?.rol || "usuario";
  const tipo = data?.tipo;

  if (tipo === "pago") {
    router.push(rol === "admin" ? "/admin/(tabs)/pagos" : "/User/(tabs)/pagos");
    return;
  }

  if (tipo === "estado_pago") {
    router.push(rol === "admin" ? "/admin/(tabs)/pagos" : "/screen/user/historial");
    return;
  }

  if (tipo === "solicitud_amistad") {
    router.push(
      rol === "admin" ? "/screen/admin/solicitudesAmistad" : "/screen/user/solicitudesAmistad"
    );
    return;
  }

  if (tipo === "respuesta_amistad") {
    router.push(rol === "admin" ? "/screen/admin/amigos" : "/User/(tabs)/chat");
  }
};

export const usePushNotifications = () => {
  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        console.log("[Push] Bootstrap de notificaciones iniciado");
        await registrarDispositivoParaPush();
        const usuario = await obtenerUsuarioGuardado();
        console.log("[Push] Sesion encontrada al abrir app:", usuario?.id || "SIN_SESION");

        if (mounted && usuario?.id) {
          await sincronizarPushTokenConBackend();
        }
      } catch (error) {
        console.log("No se pudo inicializar push notifications", error);
      }
    };

    bootstrap();

    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const data = response.notification.request.content.data || {};
      await manejarNotificacion(data as Record<string, any>);
      await sincronizarPushTokenConBackend();
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);
};
