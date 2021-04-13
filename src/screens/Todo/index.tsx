import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  LogBox,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ms } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";

import Switch from "../../components/Todo/Switch";
import Card from "../../components/Todo/Card";

import styles from "./styles";
import AnimatedContainer from "../../components/Todo/AnimatedContainer";
import Input from "../../components/Todo/Input";
import Button from "../../components/Todo/Button";
import { useTodo } from "../../hooks/useTodo";

export type TodoData = {
  id: number;
  message: string;
  images: Array<{
    id: string;
    path: string;
  }>;
};

const Todo: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [img, setImg] = useState<string[]>([]);
  const { mutation, state, setState, data, refetch, isLoading } = useTodo();

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const getImage = useCallback(async () => {
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
  }, [inputMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Switch
          state={state}
          a="Todos"
          b="Create"
          functionA={() => setState("list")}
          functionB={() => setState("create")}
        />
        {state === "list" && (
          <FlatList<TodoData>
            data={data}
            style={{
              marginTop: ms(10),
            }}
            onRefresh={refetch}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: ms(20),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <Card item={item} index={index} />}
          />
        )}
        {state === "create" && (
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
                        style={{
                          borderColor: "#fff",
                          width: ms(80),
                          height: ms(80),
                          borderRadius: ms(40),
                          zIndex: index === 0 ? 100 : -10,
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
                  title="Write your message here"
                  onSubmitEditing={() => onSubmit()}
                />
                <Button text="Submit" onPress={() => onSubmit()} />
              </View>
            </AnimatedContainer>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Todo;
