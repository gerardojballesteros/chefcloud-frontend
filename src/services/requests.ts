import axios from "axios";
import api from "./axiosInstance";

export const getRequest = async <T>(
  url: string,
  params?: unknown,
): Promise<T> => {
  try {
    const response = await api.get<T>(url, { params });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Si la API responde con un 404, personalizamos el mensaje.
      if (error.response?.status === 404) {
        throw new Error("Establecimiento no encontrado");
      }
      // Si se recibe otro error, se utiliza el mensaje disponible en la respuesta,
      // o un mensaje por defecto para GET.
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Error en GET request",
      );
    }
    // Si el error no proviene de axios
    throw new Error("Error desconocido en GET request");
  }
};

export const postRequest = async <T>(
  url: string,
  data?: unknown,
): Promise<T> => {
  try {
    const response = await api.post<T>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Puedes agregar condiciones similares si lo consideras necesario, por ejemplo:
      // if (error.response?.status === 404) { ... }
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Error en POST request",
      );
    }
    throw new Error("Error desconocido en POST request");
  }
};

export const putRequest = async <T>(
  url: string,
  data?: unknown,
): Promise<T> => {
  try {
    const response = await api.put<T>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Error en PUT request",
      );
    }
    throw new Error("Error desconocido en PUT request");
  }
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.delete<T>(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Error en DELETE request",
      );
    }
    throw new Error("Error desconocido en DELETE request");
  }
};
