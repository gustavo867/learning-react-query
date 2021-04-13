import api from "../services/api";

export const fetchTodo = async () => {
  const res = await api.get("todos");

  return res.data;
};

export const postTodo = async (data: { message: string; img: string[] }) => {
  const formData = new FormData();
  formData.append("message", data.message);
  data.img.forEach((item) => {
    formData.append("images", {
      name: `file-${item}`,
      type: "image/jpeg",
      uri: item,
    } as any);
  });

  const res = await api.post("todos", formData);

  return res.data;
};
