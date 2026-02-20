import axios from "axios";

const API_URL = "http://localhost:5000/api/requests";

export const postRequest = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllRequests = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const acceptRequest = async (id, token) => {
  const res = await axios.put(`${API_URL}/accept/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
