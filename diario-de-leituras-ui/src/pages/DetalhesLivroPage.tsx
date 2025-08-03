import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { type Livro, type Reflexao } from '../types/models'
import {
  getLivroById,
  getReflexoesByLivroId,
  addReflexao,
  deleteLivro
} from '../services/livroService'

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Button,
  Stack,
  Rating,
  List,
  ListItemText,
  TextField
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import RateReviewIcon from '@mui/icons-material/RateReview'
import AddCommentIcon from '@mui/icons-material/AddComment'

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
          setReflexoes(
            dadosReflexoes.sort(
              (a, b) =>
                new Date(b.dataCriacao).getTime() -
                new Date(a.dataCriacao).getTime()
            )
          )
        })
        .catch(() => setError('Falha ao carregar os detalhes do livro.'))
        .finally(() => setLoading(false))
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
    } catch (err) {
      alert('Erro ao adicionar reflexão.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!livro) return
    const confirm = window.confirm(
      `Tem certeza que deseja deletar "${livro.titulo}"?`
    )
    if (confirm) {
      try {
        await deleteLivro(livro.id)
        alert('Livro deletado com sucesso!')
        window.location.href = '/' // Redireciona para a home
      } catch (err) {
        alert('Falha ao deletar o livro.')
      }
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
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: '350px 1fr' }}
        gap={4}
      >
        <Box
          sx={{
            position: { xs: 'static', md: 'sticky' },
            top: '20px',
            alignSelf: 'start'
          }}
        >
          <Paper
            elevation={3}
            sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '12px' }}
          >
            <Box
              component="img"
              src={
                livro.capaUrl ||
                'https://via.placeholder.com/400x600.png?text=Sem+Capa'
              }
              alt={`Capa de ${livro.titulo}`}
              sx={{
                width: '100%',
                borderRadius: '8px',
                mb: 2,
                boxShadow: '0 10px 20px rgba(0,0,0,0.4)'
              }}
            />
            <Typography
              variant="h5"
              component="h1"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {livro.titulo}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
            >
              {livro.autor}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 1
              }}
            >
              <Rating
                name="read-only"
                value={livro.nota || 0}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({livro.nota || 'N/A'})
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
              <Button
                variant="contained"
                component={Link}
                to={`/livro/editar/${livro.id}`}
                startIcon={<EditIcon />}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                Deletar
              </Button>
            </Stack>
          </Paper>
        </Box>

        {/* Coluna da Direita (Scrollable) */}
        <Stack spacing={3}>
          {/* Seção Sinopse */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderLeft: 4,
              borderColor: 'primary.main',
              bgcolor: 'background.paper',
              borderRadius: '12px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MenuBookIcon sx={{ mr: 1.5, color: 'primary.main' }} />
              <Typography variant="h6">Sinopse</Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {livro.sinopse || 'Nenhuma sinopse disponível.'}
            </Typography>
          </Paper>

          {/* Seção Reflexões */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderLeft: 4,
              borderColor: 'primary.main',
              bgcolor: 'background.paper',
              borderRadius: '12px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RateReviewIcon sx={{ mr: 1.5, color: 'primary.main' }} />
              <Typography variant="h6">Minhas Reflexões e Notas</Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleAddReflexao}
              sx={{ display: 'flex', gap: 2, my: 2 }}
            >
              <TextField
                label="Adicionar uma nova reflexão..."
                variant="filled"
                fullWidth
                multiline
                rows={2}
                value={novaReflexao}
                onChange={e => setNovaReflexao(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={<AddCommentIcon />}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {reflexoes.length > 0 ? (
                reflexoes.map(reflexao => (
                  <Paper
                    key={reflexao.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px'
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        style: { whiteSpace: 'pre-wrap' },
                        mb: 0.5
                      }}
                      primary={reflexao.conteudo}
                      secondary={`Adicionado em: ${new Date(
                        reflexao.dataCriacao
                      ).toLocaleDateString('pt-BR')}`}
                    />
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Nenhuma reflexão adicionada ainda.
                </Typography>
              )}
            </List>
          </Paper>
        </Stack>
      </Box>
    </Container>
  )
}

export default DetalhesLivroPage
