import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormularioLivro from '../components/FormularioLivro'
import {
  getLivroById,
  updateLivro,
  type LivroFormData
} from '../services/livroService'
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress
} from '@mui/material'

const EditarLivroPage = () => {
  const { id } = useParams<{ id: string }>()
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
      navigate('/')
    } catch (error) {
      console.error('Falha ao atualizar livro:', error)
      alert('Erro ao atualizar livro.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!livro) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Livro
        </Typography>
        <FormularioLivro
          livroInicial={livro}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </Paper>
    </Container>
  )
}

export default EditarLivroPage
