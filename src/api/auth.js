import axios from "axios";
import { API_BASE_URL } from '../config/api.js';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
});

export const signup = (formData) => API.post("/signup", formData);
export const login = (formData) => API.post("/login", formData);
export const logoutAll = (token) =>
  API.post(
    "/logout-all",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
