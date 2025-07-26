import axios from 'axios'
import { type Livro } from '../types/models' // Importamos nossa interface!
// Importamos nossa interface!

// A URL base da nossa API Quarkus
const API_URL = 'http://localhost:8080/livros'

/**
 * Busca todos os livros da API.
 * Retorna uma Promessa que, quando resolvida, contém um array de Livros.
 */
export const getAllLivros = async (): Promise<Livro[]> => {
  // Usamos axios.get<Livro[]> para que o TypeScript saiba o tipo da resposta
  const response = await axios.get<Livro[]>(API_URL)
  return response.data
}

// O 'Omit' cria um tipo novo que é igual ao 'Livro', mas sem os campos 'id' e 'reflexoes'.
// Perfeito para o formulário de criação!
export type LivroFormData = Omit<Livro, 'id' | 'reflexoes'>

export const createLivro = async (livroData: LivroFormData): Promise<Livro> => {
  const response = await axios.post<Livro>(API_URL, livroData)
  return response.data
}
