import { useState } from 'react'
import { type LivroFormData } from '../services/livroService'
import {
  type Categoria,
  type Status,
  CATEGORIA_OPCOES,
  STATUS_OPCOES
} from '../types/models'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack
} from '@mui/material'

interface FormularioLivroProps {
  livroInicial: LivroFormData
  onSave: (livro: LivroFormData) => void
  isSaving: boolean
}

const FormularioLivro = ({
  livroInicial,
  onSave,
  isSaving
}: FormularioLivroProps) => {
  const [formData, setFormData] = useState<LivroFormData>(livroInicial)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target
    if (name === 'status') {
      setFormData(prev => ({ ...prev, status: value as Status }))
    } else if (name === 'categoria') {
      setFormData(prev => ({ ...prev, categoria: value as Categoria }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={3}>
        <TextField
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Autor"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="URL da Capa"
          name="capaUrl"
          value={formData.capaUrl ?? ''}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            label="Status"
            onChange={handleSelectChange}
          >
            {STATUS_OPCOES.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Select
            name="categoria"
            value={formData.categoria}
            label="Categoria"
            onChange={handleSelectChange}
          >
            {CATEGORIA_OPCOES.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Nota (0-5)"
          name="nota"
          type="number"
          value={formData.nota ?? ''}
          onChange={handleChange}
          fullWidth
          InputProps={{ inputProps: { min: 0, max: 5 } }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSaving}
          sx={{ mt: 2 }}
        >
          {isSaving ? 'Salvando...' : 'Salvar Livro'}
        </Button>
      </Stack>
    </Box>
  )
}

export default FormularioLivro
