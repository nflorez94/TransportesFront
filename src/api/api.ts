import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const obtenerDatos = async () => {
  try {
    const respuesta = await api.get('/datos');
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};
