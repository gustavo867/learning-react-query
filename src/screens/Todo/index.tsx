import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  LogBox,
  Text,
  Alert,
} from "react-native";
import { ms } from "react-native-size-matters";

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
};

const Todo: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const { mutation, state, setState, data, refetch, isLoading } = useTodo();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const onSubmit = useCallback(() => {
    if (inputMessage.length < 3) {
      Alert.alert("Please insert atleast 3 caracters");
      return;
    }
    mutation.mutate({ message: inputMessage });
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
                  justifyContent: "center",
                }}
              >
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
