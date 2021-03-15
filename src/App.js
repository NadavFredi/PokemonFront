import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import PokeCard from './components/PokeCard/PokeCard'

function App() {
  return (
    <div className="App">
      <Navbar />
      <PokeCard pokeId="100" />
    </div>
  );
}

export default App;
