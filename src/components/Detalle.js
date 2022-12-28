import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';



function Detalle(){

    const navigate = useNavigate();

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if (token === null) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=249ddf531a71a9203141732e3f34dd7e&language=en-US`;
        axios.get(endPoint).then(response => {
            const apiData = response.data;
            setMovie(apiData);
        })
        .catch(error => {
            swAlert(<h2>Hubo un error, intentalo mas tarde</h2>)
        })
    },[movieID]);


    return(
        <>
        { !movie && <p>Cargando...</p>}
        { movie && 
        <>
            <h2>{movie.title}</h2>
            <div className="row">
                <div className='col-4'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='img-fluid' alt="movie poster"/>
                </div>
                <div className='col-8'>
                    <h5>Fecha de estreno: {movie.release_date}</h5>
                    <h5>Reseña</h5>
                    <p>{movie.overview}</p>
                    <h5>Rating {movie.vote_average}</h5>
                    <h5>Generos</h5>
                    <ul>
                        { movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                    </ul>
                </div>
            </div>
        </>
        }
        </>
    )
}
export default Detalle;