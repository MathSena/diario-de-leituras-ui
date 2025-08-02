export type Categoria =
  | 'TECNICO'
  | 'FICCAO'
  | 'BIOGRAFIA'
  | 'FILOSOFIA'
  | 'AUTOAJUDA'
export type Status = 'LISTA_DE_DESEJOS' | 'LENDO' | 'LIDO'

export interface Reflexao {
  id: number
  conteudo: string
  dataCriacao: string
}

export interface Livro {
  id: number
  titulo: string
  autor: string
  categoria: Categoria
  status: Status
  nota?: number
  dataInicio?: string
  dataConclusao?: string
  reflexoes: Reflexao[]
  capaUrl?: string
}

export const STATUS_OPCOES: Status[] = ['LISTA_DE_DESEJOS', 'LENDO', 'LIDO']
export const CATEGORIA_OPCOES: Categoria[] = [
  'TECNICO',
  'FICCAO',
  'BIOGRAFIA',
  'FILOSOFIA',
  'AUTOAJUDA'
]
