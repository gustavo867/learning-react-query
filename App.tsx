import { StatusBar } from "expo-status-bar";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import StarWars from "./src/screens/StarWars";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StarWars />
    </QueryClientProvider>
  );
}
