import axios from "axios";

const api = axios.create({
  baseURL: `http://192.168.1.14:3333/v2`,
});

export const BASE_URL = "http://192.168.1.14:3333";

export default api;
