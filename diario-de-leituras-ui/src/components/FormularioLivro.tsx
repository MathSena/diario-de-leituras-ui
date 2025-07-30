import { useState } from 'react'
import { type LivroFormData } from '../services/livroService'
import {
  type Categoria,
  type Status,
  CATEGORIA_OPCOES,
  STATUS_OPCOES
} from '../types/models' // Importe Categoria e Status

// As propriedades que nosso formulário vai receber
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

  // NOVA VERSÃO CORRIGIDA DA FUNÇÃO
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    if (name === 'status') {
      setFormData(prev => ({ ...prev, status: value as Status }))
    } else if (name === 'categoria') {
      setFormData(prev => ({ ...prev, categoria: value as Categoria }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Autor:</label>
        <input
          type="text"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL da Capa:</label>
        <input
          type="text"
          name="capaUrl"
          value={formData.capaUrl ?? ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          {STATUS_OPCOES.map(opt => (
            <option key={opt} value={opt}>
              {opt.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Categoria:</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          {CATEGORIA_OPCOES.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Nota (0-5):</label>
        <input
          type="number"
          name="nota"
          value={formData.nota ?? ''}
          onChange={handleChange}
          min="0"
          max="5"
        />
      </div>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Salvando...' : 'Salvar Livro'}
      </button>
    </form>
  )
}

export default FormularioLivro
