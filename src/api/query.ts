import api from "../services/api";

export const fetchTodo = async () => {
  const res = await api.get("todos");

  console.log(res.data);

  return res.data;
};
