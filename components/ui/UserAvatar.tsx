import React, { useMemo, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  uri?: string;
  size?: number;
};

export default function UserAvatar({ uri, size = 56 }: Props) {
  const [imageError, setImageError] = useState(false);

  const source = useMemo<ImageSourcePropType>(() => {
    if (uri && !imageError) {
      return { uri };
    }

    return require("../../assets/images/icon.png");
  }, [imageError, uri]);

  return (
    <View
      style={[
        styles.ring,
        {
          width: size + 8,
          height: size + 8,
          borderRadius: (size + 8) / 2,
        },
      ]}
    >
      <Image
        source={source}
        onError={() => setImageError(true)}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbeafe",
    borderWidth: 2,
    borderColor: "#93c5fd",
  },
  image: {
    backgroundColor: "#ffffff",
  },
});
