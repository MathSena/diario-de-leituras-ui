import { useState, useEffect, useMemo } from 'react'
import { type Livro, type Status } from '../types/models'
import { getAllLivros } from '../services/livroService'

export const useLivros = () => {
  const [todosLivros, setTodosLivros] = useState<Livro[]>([])
  const [filtroStatus, setFiltroStatus] = useState<Status | 'TODOS'>('TODOS')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllLivros()
      .then(data => setTodosLivros(data))
      .catch(() => setError('Falha ao buscar os livros da API.'))
      .finally(() => setLoading(false))
  }, [])

  // useMemo otimiza o filtro, recalculando apenas quando necessário
  const livrosFiltrados = useMemo(() => {
    if (filtroStatus === 'TODOS') {
      return todosLivros
    }
    return todosLivros.filter(livro => livro.status === filtroStatus)
  }, [todosLivros, filtroStatus])

  // Retornamos tudo que o componente precisa para funcionar
  return { loading, error, livrosFiltrados, filtroStatus, setFiltroStatus }
}
