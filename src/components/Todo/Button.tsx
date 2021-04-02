import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ms } from "react-native-size-matters";

interface Props extends TouchableOpacityProps {
  text: string;
  color?: string;
}

const { width } = Dimensions.get("screen");

const Button: React.FC<Props> = ({ text, color = "#E98A15", ...rest }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
      ]}
      {...rest}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E98A15",
    minHeight: ms(50),
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    marginTop: ms(20),
    borderRadius: ms(12),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: ms(15),
  },
});

export default Button;
