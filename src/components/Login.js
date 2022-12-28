import axios from "axios";
import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";



function Login() {

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' || password === '') {
            swAlert(
                <h2>Los campos no pueden estar vacios</h2>
            );
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            swAlert(
                <h2>Debes escribir una direccion de correo electronico válida</h2>
            );
            return;
        }

        //Validacion necesaria para la API
        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(
                <h2>Credenciales inválidas</h2>
            );
            return;
        }

        console.log('Listo para enviar información');
        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert(
                    <h2>Ingresaste con exito</h2>
                )
                console.log(res);
                const token = res.data.token;
                sessionStorage.setItem('token', token);
                navigate('/listado');

            })
    }
    
    useEffect(() => {
        let token = sessionStorage.getItem('token');
        console.log('Token: ' + token);
        if (token != null) {
            navigate('/listado');
        }
    }, []);

    return (
        <>
            <h2>Formulario de Login</h2>
            <form onSubmit={submitHandler}>
                <label className="mt-3">
                    <span>Correo Electronico</span><br />
                    <input type="email" name="email" className="form-control" />
                </label>
                <br />
                <label className="mt-3">
                    <span>Contraseña</span><br />
                    <input type="password" name="password" className="form-control" />
                </label>
                <br />
                <button type="submit" className="btn btn-primary mt-3">Ingresar</button>
            </form>
        </>
    )

}

export default Login;