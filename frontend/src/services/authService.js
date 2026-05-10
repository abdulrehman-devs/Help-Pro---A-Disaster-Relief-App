import axios from "axios";

const API = `http://localhost:5000/api`;
const API_URL = "https://help-pro-a-disaster-relief-app.onrender.com";

export const signin = (data) =>
  axios.post(`${API_URL}/user/signin`, data);

export const signup = (data) =>
  axios.post(`${API_URL}/user/signup`, data);

export const adminSignin = (data) =>
  axios.post(`${API_URL}/admin/signin`, data);
