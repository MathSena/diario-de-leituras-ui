import './App.css'
import ListaLivros from './components/ListaLivros'
import { Link } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diário de Leituras</h1>
      </header>
      <main>
        <Link to="/adicionar">
          <button>Adicionar Novo Livro</button>
        </Link>
        <ListaLivros />
      </main>
    </div>
  )
}

export default App
