import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { type Livro, type Reflexao } from '../types/models'
import {
  getLivroById,
  getReflexoesByLivroId,
  addReflexao
} from '../services/livroService'

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button
} from '@mui/material'

const DetalhesLivroPage = () => {
  const { id } = useParams<{ id: string }>()
  const [livro, setLivro] = useState<Livro | null>(null)
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [novaReflexao, setNovaReflexao] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const livroId = Number(id)
      Promise.all([getLivroById(livroId), getReflexoesByLivroId(livroId)])
        .then(([dadosLivro, dadosReflexoes]) => {
          setLivro(dadosLivro)
          setReflexoes(dadosReflexoes)
        })
        .catch(() => {
          setError('Falha ao carregar os detalhes do livro.')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

  const handleAddReflexao = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !novaReflexao.trim()) return

    setIsSubmitting(true)
    try {
      const reflexaoAdicionada = await addReflexao(Number(id), novaReflexao)
      setReflexoes(prev => [reflexaoAdicionada, ...prev])
      setNovaReflexao('')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert('Erro ao adicionar reflexão.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  if (error)
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    )
  if (!livro)
    return (
      <Alert severity="warning" sx={{ m: 2 }}>
        Livro não encontrado.
      </Alert>
    )

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '30% 1fr' }} // Em telas médias (md), uma coluna de 30% e outra com o resto
          gap={4} // Equivalente ao 'spacing' do Grid
        >
          {/* O primeiro filho do Box será a primeira coluna do grid */}
          <Box
            component="img"
            src={
              livro.capaUrl ||
              'https://via.placeholder.com/200x300.png?text=Sem+Capa'
            }
            alt={`Capa de ${livro.titulo}`}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          />

          {/* O segundo filho será a segunda coluna */}
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {livro.titulo}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              color="text.secondary"
              gutterBottom
            >
              por {livro.autor}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Status:</strong> {livro.status.replace(/_/g, ' ')}
            </Typography>
            <Typography variant="body1">
              <strong>Categoria:</strong> {livro.categoria}
            </Typography>
            <Typography variant="body1">
              <strong>Nota:</strong> {livro.nota ?? 'Não avaliado'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Minhas Reflexões
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddReflexao}
            sx={{ display: 'flex', gap: 2, mb: 3 }}
          >
            <TextField
              label="Adicionar um novo insight..."
              variant="outlined"
              fullWidth
              value={novaReflexao}
              onChange={e => setNovaReflexao(e.target.value)}
            />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </Box>
          <List>
            {reflexoes.length > 0 ? (
              reflexoes.map(reflexao => (
                <ListItem key={reflexao.id} divider>
                  <ListItemText
                    primaryTypographyProps={{
                      style: { whiteSpace: 'pre-wrap' }
                    }}
                    primary={reflexao.conteudo}
                    secondary={`Em: ${new Date(
                      reflexao.dataCriacao
                    ).toLocaleDateString('pt-BR')}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ ml: 2, color: 'text.secondary' }}>
                Nenhuma reflexão adicionada ainda.
              </Typography>
            )}
          </List>
        </Box>
      </Paper>
    </Container>
  )
}

export default DetalhesLivroPage
