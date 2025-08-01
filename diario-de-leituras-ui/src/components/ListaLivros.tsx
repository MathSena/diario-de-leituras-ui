// Arquivo: src/components/ListaLivros.tsx
import { Link } from 'react-router-dom'
import { useLivros } from '../hooks/useLivros'
import { STATUS_OPCOES } from '../types/models'
import { motion } from 'framer-motion'

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
  CardMedia,
  TextField
} from '@mui/material' // Adicione TextField
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

const ListaLivros = () => {
  // Pegamos as novas variáveis do nosso hook
  const {
    loading,
    error,
    livrosFiltrados,
    filtroStatus,
    setFiltroStatus,
    termoBusca,
    setTermoBusca
  } = useLivros()

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

      {/* Caixa de Ferramentas: Busca e Filtros */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}
      >
        {/* NOVO CAMPO DE BUSCA */}
        <TextField
          label="Buscar por Título ou Autor"
          variant="outlined"
          fullWidth
          value={termoBusca}
          onChange={e => setTermoBusca(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon
                fontSize="small"
                sx={{ mr: 1, color: 'text.secondary' }}
              />
            )
          }}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center' }}
        >
          {/* ... botões de filtro ... */}
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

      {/* O resto do código permanece o mesmo, pois ele já usa 'livrosFiltrados' */}
      <Typography variant="h6" component="h2" gutterBottom>
        Resultados ({livrosFiltrados.length})
      </Typography>

      {livrosFiltrados.length === 0 ? (
        <Typography>
          Nenhum livro encontrado com os filtros aplicados.
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
              style={{ height: '100%' }}
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
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/livro/${livro.id}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
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
