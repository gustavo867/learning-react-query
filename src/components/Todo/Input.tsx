import React from "react";
import {
  TextInputProps,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ms } from "react-native-size-matters";

interface Props extends TextInputProps {
  title: string;
}

const { width, height } = Dimensions.get("screen");

const Input: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        multiline={rest?.value ? rest.value.length > 15 : false}
        placeholderTextColor="rgba(28, 26, 28, 0.7)"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    borderRadius: ms(12),
    minHeight: ms(60),
  },
  title: {
    fontSize: ms(15),
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    fontSize: ms(14),
    paddingLeft: ms(10),
    marginTop: ms(8),
    backgroundColor: "#ffff",
    minHeight: ms(50),
    width: width * 0.8,
    borderRadius: ms(12),
    fontWeight: "400",
    color: "#1C1A1C",
  },
});

export default Input;
