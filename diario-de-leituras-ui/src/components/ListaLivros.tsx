// src/components/ListaLivros.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Livro, type Status, STATUS_OPCOES } from '../types/models'
import { getAllLivros } from '../services/livroService'

// Imports do Material-UI
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Stack
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const ListaLivros = () => {
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

  const livrosFiltrados =
    filtroStatus === 'TODOS'
      ? todosLivros
      : todosLivros.filter(livro => livro.status === filtroStatus)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 4
        }}
      >
        <Typography variant="h4" component="h1">
          Minha Biblioteca
        </Typography>
        <Button
          component={Link}
          to="/adicionar"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Adicionar Livro
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Todos"
            onClick={() => setFiltroStatus('TODOS')}
            color={filtroStatus === 'TODOS' ? 'primary' : 'default'}
          />
          {STATUS_OPCOES.map(status => (
            <Chip
              key={status}
              label={status.replace(/_/g, ' ')}
              onClick={() => setFiltroStatus(status)}
              color={filtroStatus === status ? 'primary' : 'default'}
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>

      {livrosFiltrados.length === 0 ? (
        <Typography>
          Nenhum livro encontrado com o filtro selecionado.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {livrosFiltrados.map(livro => (
            <Card key={livro.id} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {livro.titulo}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  por {livro.autor}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={livro.status.replace(/_/g, ' ')} size="small" />
                  <Chip
                    label={livro.categoria}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="body2">
                  Nota: {livro.nota ?? 'N/A'}
                </Typography>
                <Button
                  component={Link}
                  to={`/livro/editar/${livro.id}`}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  )
}

export default ListaLivros
