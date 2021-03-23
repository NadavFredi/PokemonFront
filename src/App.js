import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, Switch
} from "react-router-dom";
import { Ouroboro } from 'react-spinners-css';
import './App.css';
import Favorites from './components/Favorites/Favorites';
import Navbar from './components/Navbar/Navbar';
import PokeInfo from './components/PokeInfo/PokeInfo';
import PokeList from './components/PokeList/PokeList';
import { fetchAll } from './redux/request/requestActions';

const App = () => {
  const { loading } = useSelector(state => state.requestReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAll());
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
