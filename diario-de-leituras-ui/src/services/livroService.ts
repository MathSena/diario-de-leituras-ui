import api from './api' // Importamos nossa instância central do Axios
import { type Livro, type Reflexao } from '../types/models' // Corrigido: removemos o tipo com erro de digitação

// O 'Omit' cria um tipo novo que é igual ao 'Livro', mas sem os campos 'id' e 'reflexoes'.
// Perfeito para o formulário de criação e edição!
export type LivroFormData = Omit<Livro, 'id' | 'reflexoes'>

/**
 * Busca todos os livros da API.
 */
export const getAllLivros = async (): Promise<Livro[]> => {
  // Padronizado para usar 'api' e apenas o endpoint relativo.
  const response = await api.get<Livro[]>('/livros')
  return response.data
}

/**
 * Busca um livro específico pelo seu ID.
 */
export const getLivroById = async (id: number): Promise<Livro> => {
  const response = await api.get<Livro>(`/livros/${id}`)
  return response.data
}

/**
 * Cria um novo livro.
 */
export const createLivro = async (livroData: LivroFormData): Promise<Livro> => {
  const response = await api.post<Livro>('/livros', livroData)
  return response.data
}

/**
 * Atualiza um livro existente.
 */
export const updateLivro = async (
  id: number,
  livroData: LivroFormData
): Promise<Livro> => {
  const response = await api.put<Livro>(`/livros/${id}`, livroData)
  return response.data
}

/**
 * Busca todas as reflexões de um livro específico pelo seu ID.
 */
export const getReflexoesByLivroId = async (
  livroId: number
): Promise<Reflexao[]> => {
  const response = await api.get<Reflexao[]>(`/livros/${livroId}/reflexoes`)
  return response.data
}

/**
 * Adiciona uma nova reflexão a um livro específico.
 */
export const addReflexao = async (
  livroId: number,
  conteudo: string
): Promise<Reflexao> => {
  const response = await api.post<Reflexao>(`/livros/${livroId}/reflexoes`, {
    conteudo
  })
  return response.data
}
