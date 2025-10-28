import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL + "/tasks";

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const completeTask = async (id) => {
  const res = await axios.put(`${API_URL}/${id}/done`);
  return res.data;
};
