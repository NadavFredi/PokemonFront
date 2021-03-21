import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, Switch
} from "react-router-dom";
import { Ouroboro } from 'react-spinners-css';
import './App.css';
import Favorites from './components/Favorites/Favorites';
import Navbar from './components/Navbar/Navbar';
import PokeInfo from './components/PokeInfo/PokeInfo';
import PokeList from './components/PokeList/PokeList';
import { fetchAll, fetchSingle } from './redux/request/requestActions';

const App = () => {
  const POKEMON_NUMBER = 151;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAll());
    for (let i = 1; i <= POKEMON_NUMBER; i++) {
      dispatch(fetchSingle(i));
    }
    setLoading(false);

  }, []);

  return (
    <div className="App">
      <Navbar />

      {loading ? <Ouroboro /> :

        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route path="/pokemon/type/:species">
            <PokeList />
          </Route>
          <Route path="/pokemon/:id">
            <PokeInfo />
          </Route>

          <Route path="/">
            <PokeList species="all" />
          </Route>
        </Switch>}

    </div>
  );
}

export default App;
