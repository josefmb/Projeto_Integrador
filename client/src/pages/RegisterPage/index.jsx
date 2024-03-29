import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import { register } from "../../redux/actions/userActions";
import Header from "../../components/Header";

const Register = () => {
  window.scrollTo(0, 0);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/login";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      window.alert("Foi enviado um link de verificação para o seu e-mail. Por favor, verifique o seu e-mail");
      localStorage.removeItem("userInfo");
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="text" placeholder="Nome de usuário" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Cadastrar</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Já possuo conta <strong>Entrar</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
