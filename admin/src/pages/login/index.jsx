import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/LoadingError/loading";
import Toast from "../../components/LoadingError/Toast";
import { login } from "../../redux/actions/userActions";
import Message from "../../components/LoadingError/error";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <h4 className="card-title mb-4 text-center">Entrar</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input className="form-control" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
