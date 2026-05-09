import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, useWindowDimensions, View } from "react-native";

type SplashAnimationProps = {
  onFinish: () => void;
};

const BACKGROUND_COLOR = "#FFFFFF";
const TOTAL_DURATION_MS = 3600;

export default function SplashAnimation({
  onFinish,
}: SplashAnimationProps) {
  const { width, height } = useWindowDimensions();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const finishedRef = useRef(false);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 850,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 850,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(logoScale, {
        toValue: 1.045,
        duration: 520,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(1250),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 420,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1.08,
          duration: 420,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [logoOpacity, logoScale]);

  useEffect(() => {
    const finishTimer = setTimeout(() => {
      if (finishedRef.current) {
        return;
      }

      finishedRef.current = true;
      onFinish();
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const logoWidth = Math.min(width * 0.72, 340);
  const logoHeight = Math.min(height * 0.34, 320);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View
          style={styles.logoWrapper}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: logoWidth, height: logoHeight }}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
