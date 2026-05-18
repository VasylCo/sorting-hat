import React, { useMemo, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const sortingPhrases = [
  'Hmm... difficult. Very difficult. Better be... GRYFFINDOR!',
  'Slytherin will help you on the way to greatness.',
  'You might belong in Hufflepuff, where they are just and loyal.',
  'Or perhaps in wise old Ravenclaw, if you have a ready mind.',
];

export default function App() {
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const spin = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-20deg', '0deg', '20deg'],
      }),
    [rotation]
  );

  const onSortPress = () => {
    AccessibilityInfo.announceForAccessibility('The Sorting Hat is deciding...');

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
      const phrase = sortingPhrases[Math.floor(Math.random() * sortingPhrases.length)];
      AccessibilityInfo.announceForAccessibility(phrase);
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1b2f',
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#d4af37',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f2f47',
  },
  hat: {
    fontSize: 92,
  },
  captionWrapper: {
    marginTop: 20,
  },
  caption: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
