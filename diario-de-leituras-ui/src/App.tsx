import { useLivros } from './hooks/useLivros'
import { Outlet } from 'react-router-dom'

const App = () => {
  const context = useLivros() // O hook com toda a lógica de dados vive aqui

  // O Outlet renderizará o componente Layout, passando o 'context' para ele
  // e para todos os seus descendentes.
  return <Outlet context={context} />
}

export default App
