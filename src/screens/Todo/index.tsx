import React, { useEffect } from "react";
import { FlatList, View, LogBox } from "react-native";
import { ms } from "react-native-size-matters";

import Switch from "../../components/Todo/Switch";
import Card from "../../components/Todo/Card";

import styles from "./styles";
import { useTodo } from "../../hooks/useTodo";
import { Create } from "./Create";
import { FullImage } from "./FullImage";
import { SafeAreaView } from "react-native-safe-area-context";

export type TodoData = {
  id: number;
  message: string;
  images: Array<{
    id: string;
    path: string;
  }>;
};

const Todo: React.FC = () => {
  const { state, setState, data, refetch, isLoading, fullImageisOpen } =
    useTodo();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: fullImageisOpen ? "#13131A" : "#232123",
        },
      ]}
    >
      <View style={styles.wrapper}>
        <FullImage />
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
        {state === "create" && <Create />}
      </View>
    </SafeAreaView>
  );
};

export default Todo;
