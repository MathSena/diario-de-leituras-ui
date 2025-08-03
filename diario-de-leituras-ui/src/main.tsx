import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

import Layout from './components/Layout'
import App from './App.tsx'
import ListaLivros from './components/ListaLivros'
import AdicionarLivroPage from './pages/AdicionarLivroPage.tsx'
import EditarLivroPage from './pages/EditarLivroPage.tsx'
import DetalhesLivroPage from './pages/DetalhesLivroPage.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <ListaLivros /> },
          { path: 'adicionar', element: <AdicionarLivroPage /> },
          { path: 'livro/editar/:id', element: <EditarLivroPage /> },
          { path: 'livro/:id', element: <DetalhesLivroPage /> }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
