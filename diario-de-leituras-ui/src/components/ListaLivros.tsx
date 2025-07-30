import { Link } from 'react-router-dom'
import { useLivros } from '../hooks/useLivros'
import { STATUS_OPCOES } from '../types/models'
import { motion } from 'framer-motion'

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
  Stack,
  CardMedia
  // O componente Grid não é mais necessário aqui
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const ListaLivros = () => {
  const { loading, error, livrosFiltrados, filtroStatus, setFiltroStatus } =
    useLivros()

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
    <Container maxWidth="lg">
      {}
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
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
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
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={3}
        >
          {livrosFiltrados.map((livro, index) => (
            <motion.div
              key={livro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              style={{ height: '100%' }} // Garante que a animação ocupe toda a altura
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {livro.capaUrl && (
                  <CardMedia
                    component="img"
                    sx={{ height: 240, objectFit: 'contain', mt: 2 }}
                    image={livro.capaUrl}
                    alt={`Capa do livro ${livro.titulo}`}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {livro.titulo}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    por {livro.autor}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                      label={livro.status.replace(/_/g, ' ')}
                      size="small"
                    />
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
            </motion.div>
          ))}
        </Box>
      )}
    </Container>
  )
}

export default ListaLivros
