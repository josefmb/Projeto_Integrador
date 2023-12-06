import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/userActions';
import Header from '../../components/Header';

const VerificaEmail = () => {
    const [urlValida, setUrlValida] = useState(false);
    const {id, token} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const verificaEmailUrl = () => {
            try {
                dispatch(verifyEmail(id, token));
                setUrlValida(true);
            } catch (error) {
                setUrlValida(false);
            }
        };

        verificaEmailUrl();
    }, [id, token, dispatch]);

    return (
        <div>
            <Header />
            <Fragment>
                {urlValida ? (
                    <div className="verificaEmail">
                        <h1>E-mail verificado com sucesso</h1>
                    </div>
                ) : (
                    <h1>Não encontrado</h1>
                )}
            </Fragment>
        </div>
    );
}

export default VerificaEmail;