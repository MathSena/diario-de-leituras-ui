import './App.css'
import ListaLivros from './components/ListaLivros'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diário de Leituras</h1>
      </header>
      <main>
        <ListaLivros />
      </main>
    </div>
  )
}

export default App
