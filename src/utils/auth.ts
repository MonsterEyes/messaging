import api from "./api";

export const login = async (username: string, password: string) => {
  const response = await api.post("token/", { username, password });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post("token/refresh/", { refresh: refreshToken });
  return response.data;
};

export const verifyToken = async (token: string) => {
  const response = await api.post("token/verify/", { token });
  return response.data;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) {
      throw new Error("Invalid token");
    }
    const payload = JSON.parse(atob(payloadBase64));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
};
