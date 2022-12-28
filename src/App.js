//Librerias
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Componentes
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Footer from './components/Footer';
import Header from './components/Header';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
//Estilos
import './css/app.css';

import './css/bootstrap.min.css';



function App() {

  const [ favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');
        if(favsInLocal != null){
            const favArray = JSON.parse(favsInLocal);
            setFavorites(favArray);
        }
    }, [])

  const addOrRemoveFavs = e => {
    const favMovies = localStorage.getItem('favs');

    let tempMoviesFavs;

    if (favMovies === null) {
      tempMoviesFavs = [];
    } else {
      tempMoviesFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }

    let isInArray = tempMoviesFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });

    if (!isInArray) {
      tempMoviesFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesFavs));
      setFavorites(tempMoviesFavs);
      console.log("Se agrego la pelicula");
    } else {
      let moviesLeft = tempMoviesFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("Se elimino la pelicula");
    }

  }

  return (
    <>
      <Header favorites={favorites} />
      <div className='container mt-3'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/listado" element={<Listado addOrRemoveFavs={addOrRemoveFavs} />} />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/resultados" element={<Resultados addOrRemoveFavs={addOrRemoveFavs}/>} />
          <Route path='/favoritos' element={<Favoritos favorites={favorites} addOrRemoveFavs={addOrRemoveFavs} />}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
