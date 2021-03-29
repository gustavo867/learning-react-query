import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ms } from "react-native-size-matters";
import { Results } from "../../screens/StarWars";

const { width, height } = Dimensions.get("screen");

type Props = {
  item: Results;
};

const Card: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.planetName}>{item.name}</Text>
      <Text style={styles.text}>Population - {item.population}</Text>
      <Text style={styles.text}>Terrain - {item.terrain}</Text>
      <Text style={styles.text}>Climate - {item.climate}</Text>
    </View>
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

export default Card;
