import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Importações
import Layout from './components/Layout'
import App from './App.tsx'
import AdicionarLivroPage from './pages/AdicionarLivroPage.tsx'
import EditarLivroPage from './pages/EditarLivroPage.tsx'
import DetalhesLivroPage from './pages/DetalhesLivroPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // O Layout agora é o elemento pai de todas as rotas
    children: [
      {
        index: true, // A rota '/' (index) renderizará o App (ListaLivros)
        element: <App />
      },
      {
        path: 'adicionar',
        element: <AdicionarLivroPage />
      },
      {
        path: 'livro/editar/:id',
        element: <EditarLivroPage />
      },
      {
        path: 'livro/:id',
        element: <DetalhesLivroPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
