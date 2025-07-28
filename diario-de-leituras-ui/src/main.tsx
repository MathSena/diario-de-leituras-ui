import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import EditarLivroPage from './pages/EditarLivroPage'
import AdicionarLivroPage from './pages/AdicionarLivroPage.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Crie o roteador
const router = createBrowserRouter([
  {
    path: '/', // A rota raiz mostrará a lista de livros
    element: <App />
  },
  {
    path: '/adicionar', // A rota para adicionar um novo livro
    element: <AdicionarLivroPage />
  },
  { path: '/livro/editar/:id', element: <EditarLivroPage /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {}
  </React.StrictMode>
)
