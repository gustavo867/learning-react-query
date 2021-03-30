import React, { useCallback, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import { ms } from "react-native-size-matters";
import { PeopleResults, Results } from "../../screens/StarWars";

const { width, height } = Dimensions.get("screen");

type Props = {
  item: PeopleResults;
  index: number;
};

const PeopleCard: React.FC<Props> = ({ item, index }) => {
  const translateY = useRef(new Animated.Value(-ms(60))).current;

  const entryAnimation = useCallback(() => {
    translateY.setValue(-ms(60));
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      delay: index * 250,
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
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.planetName}>{item.name}</Text>
      <Text style={styles.text}>height - {item.height}cm</Text>
      <Text style={styles.text}>Mass - {item.mass}kg</Text>
      <Text style={styles.text}>Hair Color - {item.hair_color}</Text>
      <Text style={styles.text}>Gender - {item.gender}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    minHeight: ms(60),
    padding: ms(15),
    elevation: 5,
    borderRadius: ms(12),
    marginTop: ms(8),
    backgroundColor: "#1C1A1C",
  },
  planetName: {
    color: "#F6F36F",
    fontSize: ms(15),
    fontWeight: "bold",
  },
  text: {
    color: "#9B999B",
  },
});

export default PeopleCard;
