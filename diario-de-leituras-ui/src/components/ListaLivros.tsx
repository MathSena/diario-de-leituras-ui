// Arquivo: src/components/ListaLivros.tsx
import { useState, useEffect } from 'react'
import { type Livro } from '../types/models' // Importando nosso tipo
import { getAllLivros } from '../services/livroService'

const ListaLivros = () => {
  // Tipando o estado: "livros" sempre será um array de Livro.
  const [livros, setLivros] = useState<Livro[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect é usado para executar código quando o componente "monta" na tela.
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const data = await getAllLivros()
        setLivros(data)
      } catch (err) {
        setError('Falha ao buscar os livros da API.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLivros()
  }, []) // O array vazio [] garante que isso rode apenas uma vez.

  if (loading) {
    return <p>Carregando livros...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <div>
      <h2>Minha Biblioteca</h2>
      {livros.length === 0 ? (
        <p>Nenhum livro encontrado.</p>
      ) : (
        livros.map(livro => (
          <div
            key={livro.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
              borderRadius: '8px'
            }}
          >
            <h3>{livro.titulo}</h3>
            <p>
              <strong>Autor:</strong> {livro.autor}
            </p>
            <p>
              <strong>Status:</strong> {livro.status.replace('_', ' ')}
            </p>
            <p>
              <strong>Nota:</strong> {livro.nota ?? 'N/A'}
            </p>{' '}
            {/* O '??' mostra 'N/A' se a nota for nula */}
          </div>
        ))
      )}
    </div>
  )
}

export default ListaLivros
