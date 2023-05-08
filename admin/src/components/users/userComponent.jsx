import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser, deleteUser } from "../../redux/actions/userActions";
import Loading from "../LoadingError/loading";
import Message from "../LoadingError/error";
import Pagination from "../users/Pagination";

const UserComponent = () => {
  const { pageNumber } = useParams();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUser(pageNumber));
  }, [dispatch, pageNumber, successDelete]);

  const deletehandler = (id) => {
    if (window.confirm("Tem certeza que deseja deletar o usuário?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Usuários</h2>
        <div>
          <Link to="/addUser" className="btn btn-primary">
            <i className="material-icons md-plus"></i>Novo usuário
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input type="text" placeholder="Pesquisar..." className="form-control" />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Mostre todos</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Todos</option>
                <option>Ativos</option>
                <option>Inativos</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users.map((user) => (
                <div className="col" key={user._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/user.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        {user.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">Consumidor</p>
                        )}
                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                      </div>
                      <div className="row">
                        <Link to={`/user/${user._id}/edit`} className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6">
                          <i className="fas fa-pen"></i>
                        </Link>
                        <Link to="#" onClick={() => deletehandler(user._id)} className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6">
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination pages={pages} page={page} />
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
