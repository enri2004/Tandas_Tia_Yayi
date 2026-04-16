// utils/compartir.ts

import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const link = "https://tuapp.com/invitar";


let compartiendo = false;

export const compartirLink = async () => {
  if (compartiendo) return; // evita doble click

  try {
    compartiendo = true;

    await Share.share({
      message: "Descarga la app 🔥 https://tuapp.com/invitar",
    });

  } catch (error) {
    console.log(error);
  } finally {
    compartiendo = false;
  }
};
// 🖼 Compartir QR
export const compartirQR = async (viewRef: any) => {
  try {
    const uri = await captureRef(viewRef.current, {
      format: "png",
      quality: 1,
    });

    await Sharing.shareAsync(uri);
  } catch (error) {
    console.log(error);
  }
};