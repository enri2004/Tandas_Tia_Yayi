import Axios from "axios";
import { obtenerToken } from "@/utils/api/login-registrar/authStorage";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() ||
  "https://tandas-tia-yayi-api.onrender.com";

const Apires = Axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

let warmupPromise = null;

Apires.interceptors.request.use(
  async (config) => {
    const token = await obtenerToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Apires.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.code === "ECONNABORTED") {
      error.message =
        "El servidor tardo demasiado en responder. Intenta de nuevo en unos segundos.";
    } else if (error?.message === "Network Error" || !error?.response) {
      error.message =
        "No se pudo conectar con el servidor. Revisa tu internet o intenta de nuevo en un momento.";
    }

    return Promise.reject(error);
  }
);

export const prewarmApi = async () => {
  if (!warmupPromise) {
    warmupPromise = Apires.get("/", { timeout: 15000 }).finally(() => {
      warmupPromise = null;
    });
  }

  return warmupPromise;
};

export default Apires;
