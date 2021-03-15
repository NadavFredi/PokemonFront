import './App.css';
import Navbar from './components/Navbar/Navbar';
import PokeCard from './components/PokeCard/PokeCard';
import PokeList from './components/PokeList/PokeList';

function App() {
  const pokeNumber = 151;

  return (
    <div className="App">
      <Navbar />
      <PokeList amount={pokeNumber} />
    </div>
  );
}

export default App;
