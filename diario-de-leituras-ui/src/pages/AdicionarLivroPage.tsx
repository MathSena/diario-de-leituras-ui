import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioLivro from '../components/FormularioLivro'
import { createLivro, type LivroFormData } from '../services/livroService'

const AdicionarLivroPage = () => {
  const navigate = useNavigate() // Hook para navegar entre páginas
  const [isSaving, setIsSaving] = useState(false)

  // Define o estado inicial para um livro novo
  const livroNovo: LivroFormData = {
    titulo: '',
    autor: '',
    status: 'LISTA_DE_DESEJOS',
    categoria: 'FICCAO',
    nota: undefined
  }

  const handleSave = async (livroData: LivroFormData) => {
    setIsSaving(true)
    try {
      // Converte a nota para número, caso seja uma string vinda do input
      const dadosParaSalvar = {
        ...livroData,
        nota: livroData.nota ? Number(livroData.nota) : undefined
      }
      await createLivro(dadosParaSalvar)
      alert('Livro adicionado com sucesso!')
      navigate('/') // Volta para a página inicial
    } catch (error) {
      console.error('Falha ao adicionar livro:', error)
      alert('Erro ao adicionar livro.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <h2>Adicionar Novo Livro</h2>
      <FormularioLivro
        livroInicial={livroNovo}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  )
}

export default AdicionarLivroPage
