import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { ms } from "react-native-size-matters";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232123",
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
  createWrapper: {
    flexGrow: 1,
    flex: 1,
  },
  imageContainer: {
    width: ms(100),
    height: ms(100),
    backgroundColor: "#ccc",
    borderRadius: ms(50),
    alignSelf: "center",
    marginVertical: ms(20),
  },
  todoImage: {
    width: ms(100),
    height: ms(100),
    backgroundColor: "#ccc",
    borderRadius: ms(50),
    alignSelf: "center",
  },
  absolutePlus: {
    position: "absolute",
    zIndex: 100,
    top: ms(30),
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    width: ms(40),
    height: ms(40),
    borderRadius: ms(12),
  },
});

export default styles;
