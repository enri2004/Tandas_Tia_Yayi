import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  mensaje: string;
};

export default function IconoEstado({ mensaje }: Props) {

  const texto = mensaje.toLowerCase()

  if(texto.includes("pagado") || texto.includes("recibido")){
    return (
      <MaterialCommunityIcons
        name="check-circle"
        size={24}
        color="green"
      />
    )
  }

  if(texto.includes("rechazado") || texto.includes("error")){
    return (
      <MaterialCommunityIcons
        name="close-circle"
        size={24}
        color="red"
      />
    )
  }

  return (
    <MaterialCommunityIcons
      name="sack"
      size={24}
      color="red"
    />
  )
}