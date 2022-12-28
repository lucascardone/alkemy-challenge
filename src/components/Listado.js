import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swAlert from '@sweetalert/with-react';
import axios from 'axios';

function Listado({addOrRemoveFavs}) {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);


    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=249ddf531a71a9203141732e3f34dd7e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMovieList(apiData.results);
            })
            .catch(error => {
                swAlert(<h2>Hubo un error, intentalo mas tarde</h2>)
            })
    }, [setMovieList]);



    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if (token === null) {
            navigate('/');
        }
    }, []);


    return (
        <>
            <div className="row">
                {
                    movieList.map((oneMovie, i) => {
                        return (
                            <div className='col-3' key={i}>
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

export default Listado;