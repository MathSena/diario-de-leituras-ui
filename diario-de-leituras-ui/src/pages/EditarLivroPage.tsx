// src/pages/EditarLivroPage.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormularioLivro from '../components/FormularioLivro'
import {
  getLivroById,
  updateLivro,
  type LivroFormData
} from '../services/livroService'

const EditarLivroPage = () => {
  const { id } = useParams<{ id: string }>() // Pega o ID da URL
  const navigate = useNavigate()
  const [livro, setLivro] = useState<LivroFormData | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id) {
      getLivroById(Number(id))
        .then(data => setLivro(data))
        .catch(err => console.error('Falha ao buscar livro:', err))
    }
  }, [id])

  const handleSave = async (livroData: LivroFormData) => {
    if (!id) return
    setIsSaving(true)
    try {
      const dadosParaSalvar = {
        ...livroData,
        nota: livroData.nota ? Number(livroData.nota) : undefined
      }
      await updateLivro(Number(id), dadosParaSalvar)
      alert('Livro atualizado com sucesso!')
      navigate('/')
    } catch (error) {
      console.error('Falha ao atualizar livro:', error)
      alert('Erro ao atualizar livro.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!livro) {
    return <p>Carregando dados do livro...</p>
  }

  return (
    <div>
      <h2>Editar Livro</h2>
      <FormularioLivro
        livroInicial={livro}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  )
}

export default EditarLivroPage
