import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { ms } from "react-native-size-matters";
import { TodoData } from "../../screens/Todo";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import Input from "./Input";
import { useTodo } from "../../hooks/useTodo";
import { useMutation } from "react-query";
import api, { BASE_URL } from "../../services/api";

const { width } = Dimensions.get("screen");

type Props = {
  item: TodoData;
  index: number;
};

const Card: React.FC<Props> = ({ item, index }) => {
  const { refetch } = useTodo();
  const [input, setInput] = useState("");

  const mutation = useMutation(
    (todo: { id: number; message: string }) =>
      api.put(`todos?id=${todo.id}`, { message: todo.message }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const mutationDelete = useMutation(
    (id: number) => api.delete(`todos?id=${id}`),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(-ms(60))).current;
  const translateYEdit = useRef(new Animated.Value(-ms(60))).current;
  const maxHeight = useRef(new Animated.Value(0)).current;

  const entryAnimation = useCallback(() => {
    translateY.setValue(-ms(60));
    maxHeight.setValue(0);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      delay: index * 250,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
  }, []);

  const openEdit = useCallback(() => {
    translateYEdit.setValue(-ms(60));
    maxHeight.setValue(0);
    Animated.timing(translateYEdit, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
    Animated.timing(maxHeight, {
      toValue: ms(200),
      duration: 800,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      useNativeDriver: false,
    }).start();
  }, []);

  const closeEdit = useCallback(() => {
    Animated.timing(translateYEdit, {
      toValue: -ms(60),
      duration: 800,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
    Animated.timing(maxHeight, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      useNativeDriver: false,
    }).start();
  }, []);

  const onSubmit = useCallback(() => {
    if (input.length < 3) {
      Alert.alert("Please insert atleast 3 caracters");

      return;
    } else {
      mutation.mutate({ id: item.id, message: input });
    }
  }, [input]);

  const edit = useCallback(() => {
    if (isVisible === false) {
      openEdit();
      setIsVisible((state) => !state);
    } else {
      closeEdit();
      setTimeout(() => {
        setIsVisible((state) => !state);
      }, 400);
    }
  }, [isVisible]);

  const opacity = translateY.interpolate({
    inputRange: [-ms(60), 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const rotate = translateYEdit.interpolate({
    inputRange: [-ms(60), 0],
    outputRange: ["0deg", "180deg"],
    extrapolate: "clamp",
  });

  const opacityEdit = translateYEdit.interpolate({
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
      <TouchableOpacity
        style={{
          flexDirection: "column",
          width: width * 0.8 - ms(15),
        }}
        onPress={() => edit()}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: width * 0.8 - ms(15),
          }}
        >
          <Text style={styles.planetName}>{item.message}</Text>
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
          >
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#ffff" />
          </Animated.View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: ms(4),
          }}
        >
          {item.images.map((item, index) => (
            <Image
              key={item.id}
              source={{ uri: `${BASE_URL}/uploads/${item.path}` }}
              style={{
                width: ms(40),
                height: ms(40),
                borderRadius: ms(20),
                zIndex: index === 0 ? 1000 : -10,
                marginLeft: index !== 0 ? ms(-10) : 0,
              }}
            />
          ))}
        </View>
      </TouchableOpacity>
      <Animated.View
        style={{
          display: isVisible ? "flex" : "none",
        }}
      >
        <Animated.View
          style={{
            opacity: opacityEdit,
            marginTop: ms(70),
            transform: [
              {
                translateY: translateYEdit,
              },
            ],
          }}
        >
          <Input
            title="Edit your todo message"
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder=" Write here"
            onSubmitEditing={() => onSubmit()}
          />
          <Button text="Submit" onPress={() => onSubmit()} />
          <Button
            text="Delete Todo"
            color="#8C1C13"
            onPress={() => mutationDelete.mutate(item.id)}
          />
        </Animated.View>
      </Animated.View>
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

export default Card;
