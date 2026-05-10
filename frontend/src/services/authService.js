import axios from "axios";

const API = `http://localhost:5000/api`;
const API_URL = "https://help-pro-a-disaster-relief-app.onrender.com";

export const signup = (data) =>
  axios.post(`${API_URL}/api/user/signup`, data);

export const signin = (data) =>
  axios.post(`${API_URL}/api/user/signin`, data);

export const adminSignin = (data) =>
  axios.post(`${API_URL}/api/admin/signin`, data);
