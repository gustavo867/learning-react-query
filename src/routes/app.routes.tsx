import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { projectType } from "../config";
import TodoProvider from "../context/TodoContext";
import StarWars from "../screens/StarWars";
import Todo from "../screens/Todo";

const queryClient = new QueryClient();

export function AppRoutes() {
  return projectType === "todo" ? (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TodoProvider>
          <Todo />
        </TodoProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  ) : (
    <QueryClientProvider client={queryClient}>
      <StarWars />
    </QueryClientProvider>
  );
}
