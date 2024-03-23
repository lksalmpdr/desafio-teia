import { Registro } from '../interfaces/registro';

const baseUrl = 'https://jsonplaceholder.typicode.com/photos';

async function fetchRegistros(): Promise<Registro[]> {
    try {
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) {
        throw new Error('Não foi possível recuperar os registros');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao recuperar os registros:', error);
      throw new Error('Erro ao buscar os carros');
    }
  }

export default {
  fetchRegistros
}