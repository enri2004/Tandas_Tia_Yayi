import React from "react";
import {View,Text,TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    placeholder?:string
    onChange?: (text: string) => void
}

export default function Input({placeholder,onChange, }:Props){
    return(
        <SafeAreaView>
              <View>
                <TextInput placeholder={placeholder} onChangeText={onChange} style={{ borderWidth: 0,outlineStyle: "none",}} underlineColorAndroid="transparent" />
              </View>
        </SafeAreaView>
    )
}