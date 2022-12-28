import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import axios from 'axios';

function Resultados ({addOrRemoveFavs}){

    const navigate = useNavigate();
    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if (token === null) {
            navigate('/');
        }
    }, []);

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [movieResults, setMovieResults] = useState([]);
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=249ddf531a71a9203141732e3f34dd7e&language=en-US&query=${keyword}&page=1&include_adult=false`;
        axios.get(endPoint).then(response => {
            let results = response.data.results;
            setMovieResults(results);
            if(results.length === 0){
                swAlert(
                    <h4>Tu busqueda no arrojo resultados</h4>
                )
            }
        })
    },[]);

    return(
        <>
        
        <h2>Buscaste: <i>{keyword}</i></h2>
        { movieResults.length === 0 && <p>No se encontaron Resultados</p>}
            <div className="row">
                {
                    movieResults.map((oneMovie, i) => {
                        return (
                            <div className='col-4' key={i}>
                                <div className="card mt-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                                    <button className='fav-btn' onClick={addOrRemoveFavs} data-movie-id={oneMovie.id}>🖤</button>
                                    <div className="card-body">
                                        <h5 className="card-title">{ oneMovie.title.substring(0,30) }</h5>
                                        <p className="card-text">{ oneMovie.overview.substring(0,100) }</p>
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View Detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Resultados;