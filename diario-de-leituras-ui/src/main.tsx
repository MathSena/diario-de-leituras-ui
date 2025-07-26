import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AdicionarLivroPage from './pages/AdicionarLivroPage.tsx' // Importe a nova página
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Importe

// Crie o roteador
const router = createBrowserRouter([
  {
    path: '/', // A rota raiz mostrará a lista de livros
    element: <App />
  },
  {
    path: '/adicionar', // A rota para adicionar um novo livro
    element: <AdicionarLivroPage />
  }
  // { path: "/livro/editar/:id", element: <EditarLivroPage /> }, // Rota de edição (para o futuro)
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Use o RouterProvider */}
  </React.StrictMode>
)
