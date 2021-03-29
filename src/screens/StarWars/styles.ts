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
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: width * 0.85,
    flexDirection: "row",
    marginTop: ms(5),
    marginBottom: ms(10),
  },
  btn: {
    width: width * 0.45 - ms(20),
    marginHorizontal: ms(10),
    height: ms(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C1A1C",
    borderRadius: ms(12),
  },
  btnText: {
    color: "#fff",
    fontSize: ms(14),
    maxWidth: width * 0.45 - ms(20),
    fontWeight: "400",
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
