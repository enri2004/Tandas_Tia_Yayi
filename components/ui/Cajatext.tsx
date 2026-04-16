import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type Props = {
  titulo: string;
  subtitulo?: string;
  imagen?: ImageSourcePropType;
  icono?: React.ReactNode;
  derecha?: React.ReactNode;
};

export default function Cajatext({
  titulo,
  subtitulo,
  imagen,
  icono,
  derecha
}: Props) {

  return (
    <Swipeable>
      <View style={styles.tarjeta}>

        {/* IZQUIERDA */}
        {imagen && (
          <Image source={imagen} style={styles.profile}/>
        )}

        {icono && icono}

        {/* TEXTO */}
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo}>{titulo}</Text>
          {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
        </View>

        {/* DERECHA */}
        {derecha}

      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  tarjeta:{
    marginVertical:6,
    marginHorizontal:16,
    width:"90%",
    padding:20,
    alignSelf:"center",
    backgroundColor:"white",
    borderRadius:20,
    flexDirection:"row",
    alignItems:"center",
    elevation:5
  },

  profile:{
    width:50,
    height:50,
    borderRadius:25,
    marginRight:10
  },

  titulo:{
    fontSize:16,
    fontWeight:"bold"
  },

  subtitulo:{
    color:"gray"
  }
});