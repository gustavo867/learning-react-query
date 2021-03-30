import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ms } from "react-native-size-matters";

// import { Container } from './styles';

const { width } = Dimensions.get("screen");

type Props = {
  a: string;
  b: string;
  state: "planets" | "peoples";
  functionA: () => void;
  functionB: () => void;
};

const Switch: React.FC<Props> = ({ a, b, functionA, functionB, state }) => {
  const pos = useRef(new Animated.Value(0)).current;

  const toogle = (to: number) => {
    Animated.timing(pos, {
      toValue: to,
      duration: 400,
      easing: Easing.bezier(1, 0.06, 0.25, 0.47),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (state === "planets") {
      pos !== new Animated.Value(0) ? toogle(0) : pos;
    } else {
      pos !== new Animated.Value(width / 4) ? toogle(width / 4) : pos;
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ translateX: pos }],
          },
        ]}
      />
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => {
            toogle(0);
            functionA();
          }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <Animated.Text style={[styles.text]}>{a}</Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toogle(width / 4);
            functionB();
          }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <Animated.Text style={[styles.text]}>{b}</Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: ms(40),
    width: width / 2,
    borderRadius: ms(8),
    marginTop: ms(10),
  },
  animatedView: {
    borderRadius: ms(8),
    height: ms(40),
    backgroundColor: "gold",
    width: "50%",
  },
  textContainer: {
    height: ms(40),
    width: width / 2,
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: ms(15),
  },
});

export default Switch;
