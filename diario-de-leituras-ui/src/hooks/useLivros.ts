// Arquivo: src/hooks/useLivros.ts
import { useState, useEffect, useMemo } from 'react'
import { type Livro, type Status } from '../types/models'
import { getAllLivros } from '../services/livroService'

export const useLivros = () => {
  const [todosLivros, setTodosLivros] = useState<Livro[]>([])
  const [filtroStatus, setFiltroStatus] = useState<Status | 'TODOS'>('TODOS')
  const [termoBusca, setTermoBusca] = useState('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllLivros()
      .then(data => setTodosLivros(data))
      .catch(() => setError('Falha ao buscar os livros da API.'))
      .finally(() => setLoading(false))
  }, [])

  const livrosFiltrados = useMemo(() => {
    return (
      todosLivros
        // 1. Primeiro, filtra por STATUS
        .filter(livro => {
          if (filtroStatus === 'TODOS') return true
          return livro.status === filtroStatus
        })
        // 2. Depois, filtra o resultado pelo TERMO DE BUSCA
        .filter(livro => {
          const busca = termoBusca.toLowerCase()
          return (
            livro.titulo.toLowerCase().includes(busca) ||
            livro.autor.toLowerCase().includes(busca)
          )
        })
    )
  }, [todosLivros, filtroStatus, termoBusca])

  return {
    loading,
    error,
    livrosFiltrados,
    filtroStatus,
    setFiltroStatus,
    termoBusca,
    setTermoBusca
  }
}
