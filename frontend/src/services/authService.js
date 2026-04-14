import axios from "axios";

const API = `http://localhost:5000/api`;

export const signin = (data) =>
  axios.post(`${API}/user/signin`, data);

export const signup = (data) =>
  axios.post(`${API}/user/signup`, data);

export const adminSignin = (data) =>
  axios.post(`${API}/admin/signin`, data);
