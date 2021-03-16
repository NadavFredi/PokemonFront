import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import PokeList from './components/PokeList/PokeList';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Favorites from './components/Favorites/Favorites';

const App = () => {
  const pokeNumber = 151;


  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/">
          <PokeList amount={pokeNumber} />
        </Route>

        <Route path="/favorites">
          <Favorites pokeIds={[1, 2, 3, 4, 5, 6]} />
        </Route>

        <Route path="/pokemon/:id">
          <div>pokemon </div>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
