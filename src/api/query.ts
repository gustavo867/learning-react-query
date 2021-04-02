import api from "../services/api";

export const fetchTodo = async () => {
  const res = await api.get("todos");

  return res.data;
};
