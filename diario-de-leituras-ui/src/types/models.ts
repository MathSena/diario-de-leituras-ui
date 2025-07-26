// Tipos para os Enums do backend
export type Categoria =
  | 'TECNICO'
  | 'FICCAO'
  | 'BIOGRAFIA'
  | 'FILOSOFIA'
  | 'AUTOAJUDA'
export type Status = 'LISTA_DE_DESEJOS' | 'LENDO' | 'LIDO'

// Interface para as Reflexões
export interface Reflexao {
  id: number
  conteudo: string
  dataCriacao: string // O JSON converte datas para string
}

// Interface principal para o Livro
export interface Livro {
  id: number
  titulo: string
  autor: string
  categoria: Categoria
  status: Status
  nota?: number // O '?' indica que o campo pode ser nulo ou não existir
  dataInicio?: string
  dataConclusao?: string
  reflexoes: Reflexao[] // Um livro pode ter uma lista de reflexões
}

export const STATUS_OPCOES = ['LISTA_DE_DESEJOS', 'LENDO', 'LIDO']
export const CATEGORIA_OPCOES = [
  'TECNICO',
  'FICCAO',
  'BIOGRAFIA',
  'FILOSOFIA',
  'AUTOAJUDA'
]
