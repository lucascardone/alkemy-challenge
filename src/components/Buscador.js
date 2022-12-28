import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';


function Buscador() {
    const navigate = useNavigate();
    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if(keyword.length < 4){
            swAlert(<h5>Tienes que escribir una palabra clave</h5>);
        }else{
            e.currentTarget.keyword.value = '';
            navigate(`/resultados?keyword=${keyword}`);
        }
    }
    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0">
                <input type="text" name="keyword" className="form-control ms-3" />
            </label>
            
            <button type="submit" className="btn btn-success ms-4">Buscar</button>
        </form>
    )
}
export default Buscador;