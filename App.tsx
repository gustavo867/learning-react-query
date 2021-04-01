import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import StarWars from "./src/screens/StarWars";
import Todo from "./src/screens/Todo";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}
