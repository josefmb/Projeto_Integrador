import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  updateUser,
} from "../../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/error";
import Loading from "../LoadingError/loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2,
};

const EditUserMain = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const userEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = userEdit;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast.success("Usuário Atualizado", ToastObjects);
    } else {
      if (!user.name || user._id !== id) {
        dispatch(editUser(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setConfirmPassword(user.password);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error("As senhas estão em desacordo", ToastObjects);
        }
      } else {
          dispatch(
            updateUser({
                _id: id, 
                name, 
                email, 
                password, 
                isAdmin,
          })
        );
      }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/users/1" className="btn btn-danger text-white">Usuários</Link>
            <h2 className="content-title">Atualizar usuário</h2>
            <div>
              <button type="submit" className="btn btn-primary">Atualizar</button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="user_name" className="form-label">Nome</label>
                        <input type="text" placeholder="Nome:" className="form-control" id="user_name" required value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="user_email" className="form-label">Email</label>
                        <input type="e-mail" placeholder="Email:" className="form-control" id="user_email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="user_password" className="form-label">Senha</label>
                        <input type="password" placeholder="Senha:" className="form-control" id="user_password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="user_confirm_password" className="form-label">Confirmar Senha</label>
                        <input type="password" placeholder="Senha:" className="form-control" id="user_confirm_password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <input type="checkbox" className="form-checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                        <label htmlFor="user_isAdmin" className="form-label">Administrador</label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditUserMain;
