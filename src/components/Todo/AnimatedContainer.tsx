import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { ms } from "react-native-size-matters";

// import { Container } from './styles';

const AnimatedContainer: React.FC = ({ children }) => {
  const translateY = useRef(new Animated.Value(-ms(100))).current;

  const entryAnimation = useCallback(() => {
    translateY.setValue(-ms(100));
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
  }, []);

  const opacity = translateY.interpolate({
    inputRange: [-ms(60), 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    entryAnimation();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      {children}
    </Animated.View>
  );
};

export default AnimatedContainer;
