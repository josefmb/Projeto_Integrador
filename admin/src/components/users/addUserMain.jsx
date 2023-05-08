import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CREATE_RESET } from "../../redux/constants/userConstants";
import { createUser } from "../../redux/actions/userActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/error";
import Loading from "../LoadingError/loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2,
};

const AddUserMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;

  useEffect(() => {
    if (user) {
      toast.success("Usuário adicionado", ToastObjects);
      dispatch({ type: USER_CREATE_RESET });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin(false);
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("As senhas estão em desacordo", ToastObjects);
      }
    } else {
        dispatch(createUser(name, email, password, isAdmin));
    }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/users/1" className="btn btn-danger text-white">Usuários</Link>
            <h2 className="content-title">Adicionar usuário</h2>
            <div>
              <button type="submit" className="btn btn-primary">Adicionar</button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="user_name" className="form-label">Nome do usuário</label>
                    <input type="text" placeholder="Nome" className="form-control" id="user_name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_email" className="form-label">Email do usuário</label>
                    <input type="text" placeholder="Email" className="form-control" id="user_email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_password" className="form-label">Senha</label>
                    <input type="password" placeholder="Senha:" className="form-control" id="user_password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_confirm_password" className="form-label">Confirmar Senha</label>
                    <input type="password" placeholder="Senha:" className="form-control" id="user_confirm_password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  <div className="mb-1">
                    <input type="checkbox" id="user_admin" className="form-checkbox" value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    <label htmlFor="user_admin" className="form-label">Administrador</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddUserMain;
