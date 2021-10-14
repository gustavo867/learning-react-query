import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ms } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";
import AnimatedContainer from "../../components/Todo/AnimatedContainer";
import { useTodo } from "../../hooks/useTodo";
import Input from "../../components/Todo/Input";
import Button from "../../components/Todo/Button";

export function Create() {
  const { mutation, setState } = useTodo();

  const [inputMessage, setInputMessage] = useState("");
  const [img, setImg] = useState<string[]>([]);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");

      return false;
    }

    return true;
  };

  const getImage = useCallback(async () => {
    const granted = await getPermission();

    if (granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        let uri = result.uri;
        setImg((state) => [...state, uri]);
      }
    }
  }, [img]);

  const onSubmit = useCallback(() => {
    if (inputMessage.length < 3) {
      Alert.alert("Please insert atleast 3 caracters");
      return;
    }

    if (img === undefined) {
      Alert.alert("Please upload an image");
      return;
    }

    mutation.mutate({ message: inputMessage, img: img });
    setInputMessage("");
    setState("list");
  }, [inputMessage]);

  return (
    <View style={styles.createWrapper}>
      <AnimatedContainer>
        <Text style={[styles.title, { marginTop: ms(15) }]}>
          Create your todo
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View style={styles.imageContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.absolutePlus}
              onPress={() => getImage()}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
            {img.length !== 0 && (
              <Image
                style={styles.todoImage}
                source={{ uri: `${img[img.length - 1]}` }}
              />
            )}
          </View>

          <ScrollView
            style={{
              flexGrow: 0,
              marginBottom: ms(10),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {img.length !== 0 &&
              img.map((item, index) => (
                <Image
                  key={index}
                  style={{
                    borderColor: "#fff",
                    width: ms(80),
                    height: ms(80),
                    borderRadius: ms(40),
                    zIndex: index === 0 ? 100 : -10 * index,
                    marginLeft: index === 0 ? 0 : ms(-10),
                  }}
                  source={{ uri: item }}
                />
              ))}
          </ScrollView>
          <Input
            maxLength={206}
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            title="Todo name goes here"
            onSubmitEditing={() => onSubmit()}
          />
          <Button text="Submit" onPress={() => onSubmit()} />
        </View>
      </AnimatedContainer>
    </View>
  );
}
