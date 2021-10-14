import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function useTodo() {
  const values = useContext(TodoContext);

  return values;
}

export { useTodo };
