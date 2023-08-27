import { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/userActions';

const VerificaEmail = () => {
    const [urlValida, setUrlValida] = useState(false);
    const {id, token} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const verificaEmailUrl = () => {
            try {
                console.log(id);
                dispatch(verifyEmail(id, token));
                setUrlValida(true);
            } catch (error) {
                console.log(error);
                setUrlValida(false);
            }
        };

        verificaEmailUrl();
    }, [id, token, dispatch]);

    return (
        <Fragment>
            {urlValida ? (
                <div>
                    <h1>E-mail verificado com sucesso</h1>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </div>
            ) : (
                <h1>Não encontrado</h1>
            )}
        </Fragment>
    );
}

export default VerificaEmail;