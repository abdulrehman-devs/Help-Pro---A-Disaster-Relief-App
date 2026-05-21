import axios from "axios";

const API = `http://localhost:5000`;
// const API_URL = "https://help-pro-a-disaster-relief-app.onrender.com";

const api = axios.create({
  baseURL: API,
  timeout: 15000,
});

export const signup = (data) => api.post("/api/user/signup", data);

export const signin = (data) =>
  api.post("/api/user/signin", {
    email: data.email,
    password: data.password,
  });

export const adminSignin = (data) =>
  api.post("/api/admin/signin", {
    email: data.email,
    password: data.password,
  });
