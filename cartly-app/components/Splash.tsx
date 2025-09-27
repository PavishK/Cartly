// components/Splash.js
import { images } from "@/constants/images";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Image } from "react-native";

export default function Splash({ onFinish }) {
  const [showSplash, setShowSplash] = useState(true);

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in + scale up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 30,
        useNativeDriver: true,
      }),
    ]).start();

    // Hold for a moment, then fade out
    const timer = setTimeout(() => {
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
        onFinish?.(); // notify parent that splash finished
      });
    }, 2500); // stays visible for 2.5s

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return null;

  return (
    <Animated.View
      className="flex-1 items-center justify-center bg-[#556B2F]"
      style={{ opacity: fadeOutAnim }}
    >
      <Animated.Image
        source={images.welcome}
        resizeMode="contain"
        className="w-32 h-32 mb-5"
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
      />
      <Animated.Text
        className="text-white text-4xl font-bold"
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
      >
        Cartly
      </Animated.Text>
    </Animated.View>
  );
}
