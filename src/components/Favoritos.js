import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Favoritos(props){

    const navigate = useNavigate();
    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if (token === null) {
            navigate('/');
        }
    }, []);

    

    return (
        <>
        <h2>Seccion de Favoritos</h2>
            <div className="row">
                {
                    props.favorites.map((oneMovie, i) => {
                        return (
                            <div className='col-3' key={i}>
                                <div className="card mt-4">
                                    <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                                    <button className='fav-btn' onClick={props.addOrRemoveFavs} data-movie-id={oneMovie.id}>🖤</button>
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
export default Favoritos;