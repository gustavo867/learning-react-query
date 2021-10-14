import React, { createContext, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { fetchTodo, postTodo } from "../api/query";

type TodoContextInterface = ReturnType<typeof useTodoValues>;

export const TodoContext = createContext<TodoContextInterface>(
  {} as TodoContextInterface
);

function useTodoValues() {
  const [state, setState] = useState<"list" | "create">("list");
  const [currentImage, setCurrentImage] = useState("");
  const [fullImageisOpen, setFullImageIsOpen] = useState(false);

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

  useEffect(() => {
    if (state === "list") {
      refetch();
    }
  }, [state]);

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
      fullImageisOpen,
      setFullImageIsOpen,
      currentImage,
      setCurrentImage,
    }),
    [
      mutation,
      state,
      setState,
      isLoading,
      data,
      error,
      isPreviousData,
      refetch,
      fullImageisOpen,
      setFullImageIsOpen,
      currentImage,
      setCurrentImage,
    ]
  );

  return values;
}

const TodoProvider: React.FC = ({ children }) => {
  const data = useTodoValues();

  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
