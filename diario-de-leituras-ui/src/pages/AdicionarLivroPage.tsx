import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioLivro from '../components/FormularioLivro'
import { createLivro, type LivroFormData } from '../services/livroService'
import { Container, Paper, Typography } from '@mui/material'

const AdicionarLivroPage = () => {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)

  const livroNovo: LivroFormData = {
    titulo: '',
    autor: '',
    status: 'LISTA_DE_DESEJOS',
    categoria: 'FICCAO',
    nota: undefined,
    capaUrl: ''
  }

  const handleSave = async (livroData: LivroFormData) => {
    setIsSaving(true)
    try {
      const dadosParaSalvar = {
        ...livroData,
        nota: livroData.nota ? Number(livroData.nota) : undefined
      }
      await createLivro(dadosParaSalvar)
      navigate('/')
    } catch (error) {
      console.error('Falha ao adicionar livro:', error)
      alert('Erro ao adicionar livro.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Adicionar Novo Livro
        </Typography>
        <FormularioLivro
          livroInicial={livroNovo}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </Paper>
    </Container>
  )
}

export default AdicionarLivroPage
