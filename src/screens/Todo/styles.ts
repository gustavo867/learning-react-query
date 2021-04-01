import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { ms } from "react-native-size-matters";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232123",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : ms(40),
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "gold",
    fontSize: ms(20),
    fontWeight: "600",
    maxWidth: width * 0.8,
  },
  error: {
    color: "red",
    fontSize: ms(38),
    fontWeight: "600",
    maxWidth: width * 0.8,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default styles;
