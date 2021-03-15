import './App.css';
import Navbar from './components/Navbar/Navbar';
import PokeCard from './components/PokeCard/PokeCard';

function App() {
  return (
    <div className="App">
      <Navbar />

      <PokeCard pokeId="50" />
    </div>
  );
}

export default App;
