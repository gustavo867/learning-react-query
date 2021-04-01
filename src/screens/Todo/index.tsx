import axios from "axios";
import React, { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { ms } from "react-native-size-matters";
import { useQuery } from "react-query";
import { fetchTodo } from "../../api/query";

import styles from "./styles";

type TodoData = {
  id: number;
  message: string;
};

const Todo: React.FC = () => {
  const { isLoading, data, error, isPreviousData, refetch } = useQuery(
    "todos",
    () => fetchTodo(),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  if (!isLoading) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center", paddingTop: 0 },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: ms(15),
              fontSize: ms(40),
            },
          ]}
        >
          Loading
        </Text>
        <ActivityIndicator size="large" color="gold" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList<TodoData>
          data={data}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.title}>{item.message}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Todo;
