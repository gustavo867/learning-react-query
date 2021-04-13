import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchTodo, postTodo } from "../api/query";
import api from "../services/api";

function useTodo() {
  const [state, setState] = useState<"list" | "create">("list");

  const { isLoading, data, error, isPreviousData, refetch } = useQuery(
    "todos",
    () => fetchTodo(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        setState("list");
      },
    }
  );

  const mutation = useMutation(
    (newTodo: { message: string; img: string[] }) => postTodo(newTodo),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const values = useMemo(
    () => ({
      mutation,
      state,
      setState,
      isLoading,
      data,
      error,
      isPreviousData,
      refetch,
    }),
    [mutation, state, setState, isLoading, data, error, isPreviousData, refetch]
  );

  return values;
}

export { useTodo };
