import { useOutletContext } from 'react-router-dom'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert
} from '@mui/material'
import LivroCard from './LivroCard'
import { type Livro, type Status } from '../types/models'

type AppContextType = {
  loading: boolean
  error: string | null
  livrosFiltrados: Livro[]
  filtroStatus: Status | 'TODOS'
  setFiltroStatus: (status: Status | 'TODOS') => void
}

const ListaLivros = () => {
  const context = useOutletContext<AppContextType>()

  if (!context)
    return <Alert severity="error">Contexto da aplicação não encontrado.</Alert>

  const { loading, error, livrosFiltrados, filtroStatus, setFiltroStatus } =
    context

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Typography variant="h4" component="h2">
          Minha Biblioteca
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={filtroStatus}
            label="Status"
            onChange={e => setFiltroStatus(e.target.value as Status | 'TODOS')}
          >
            <MenuItem value="TODOS">Todos os Status</MenuItem>
            <MenuItem value="LENDO">Lendo</MenuItem>
            <MenuItem value="LIDO">Lido</MenuItem>
            <MenuItem value="LISTA_DE_DESEJOS">Lista de Desejos</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={3}
      >
        {livrosFiltrados.map((livro, index) => (
          <LivroCard key={livro.id} livro={livro} index={index} />
        ))}
      </Box>
    </Box>
  )
}

export default ListaLivros
