import api from './api'
import { type Livro, type Reflexao } from '../types/models'

export type LivroFormData = Omit<Livro, 'id' | 'reflexoes'>

export const getAllLivros = async (): Promise<Livro[]> => {
  const response = await api.get<Livro[]>('/livros')
  return response.data
}

export const getLivroById = async (id: number): Promise<Livro> => {
  const response = await api.get<Livro>(`/livros/${id}`)
  return response.data
}

export const createLivro = async (livroData: LivroFormData): Promise<Livro> => {
  const response = await api.post<Livro>('/livros', livroData)
  return response.data
}

export const updateLivro = async (
  id: number,
  livroData: LivroFormData
): Promise<Livro> => {
  const response = await api.put<Livro>(`/livros/${id}`, livroData)
  return response.data
}

export const deleteLivro = async (id: number): Promise<void> => {
  await api.delete(`/livros/${id}`)
}

export const getReflexoesByLivroId = async (
  livroId: number
): Promise<Reflexao[]> => {
  const response = await api.get<Reflexao[]>(`/livros/${livroId}/reflexoes`)
  return response.data
}

export const addReflexao = async (
  livroId: number,
  conteudo: string
): Promise<Reflexao> => {
  const response = await api.post<Reflexao>(`/livros/${livroId}/reflexoes`, {
    conteudo
  })
  return response.data
}
