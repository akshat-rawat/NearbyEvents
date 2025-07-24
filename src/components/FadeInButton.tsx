import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
}

export default function FadeInButton({ text, onPress, disabled }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    });
    fadeIn.start();

    return () => {
      fadeIn.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.buttonContainer, { opacity }]}
      testID={'fadeIn-btn'}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0047B3',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
});
