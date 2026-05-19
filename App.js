import React, { useMemo, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Sound from "react-native-sound";

Sound.setCategory("Playback");

function safeAudio(loader, fallbackText) {
  try {
    return { source: loader(), fallbackText };
  } catch (e) {
    return { source: null, fallbackText };
  }
}

const sortingAudioFiles = [
  safeAudio(
    () => require("./assets/audio/gryffindor-1.mp3"),
    "Hmm... difficult. Very difficult. Better be... GRYFFINDOR!",
  ),
  safeAudio(
    () => require("./assets/audio/slytherin-1.mp3"),
    "Slytherin will help you on the way to greatness.",
  ),
  safeAudio(
    () => require("./assets/audio/hufflepuff-1.mp3"),
    "You might belong in Hufflepuff, where they are just and loyal.",
  ),
  safeAudio(
    () => require("./assets/audio/ravenclaw-1.mp3"),
    "Or perhaps in wise old Ravenclaw, if you have a ready mind.",
  ),
];

export default function App() {
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [result, setResult] = useState(null);

  const spin = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ["-20deg", "0deg", "20deg"],
      }),
    [rotation],
  );

  const playAudioClip = (audioClip) => {
    if (!audioClip.source) return Promise.resolve(false);

    return new Promise((resolve) => {
      const uri = Image.resolveAssetSource(audioClip.source)?.uri;
      if (!uri) {
        resolve(false);
        return;
      }

      const sound = new Sound(uri, "", (error) => {
        if (error) {
          resolve(false);
          return;
        }
        sound.play((success) => {
          sound.release();
          resolve(success);
        });
      });
    });
  };

  const onSortPress = () => {
    const audioClip =
      sortingAudioFiles[Math.floor(Math.random() * sortingAudioFiles.length)];
    AccessibilityInfo.announceForAccessibility(
      "The Sorting Hat is deciding...",
    );
    const audioPlaybackPromise = playAudioClip(audioClip);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 220,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 220,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(rotation, {
          toValue: -1,
          duration: 220,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 220,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 160,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      audioPlaybackPromise.then((played) => {
        setResult(audioClip.fallbackText);
        if (!played) {
          AccessibilityInfo.announceForAccessibility(audioClip.fallbackText);
        }
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        accessibilityLabel="Sort me into a Hogwarts house"
        accessibilityRole="button"
        onPress={onSortPress}
        style={styles.button}
      >
        <Animated.View style={{ transform: [{ rotate: spin }, { scale }] }}>
          <Text style={styles.hat}>🎩</Text>
        </Animated.View>
      </Pressable>
      <View style={styles.captionWrapper}>
        <Text style={styles.caption}>Tap the Sorting Hat</Text>
        {result ? <Text style={styles.result}>{result}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1b1b2f",
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "#d4af37",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f2f47",
  },
  hat: {
    fontSize: 92,
  },
  captionWrapper: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  caption: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  result: {
    marginTop: 16,
    color: "#d4af37",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
