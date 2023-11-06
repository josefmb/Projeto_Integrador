import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/home';
import ProductPage from './pages/products';
import AddProductPage from './pages/products/addProducts';
import UsersPage from './pages/user/index';
import EditProductPage from './pages/products/editProducts';
import LoginPage from './pages/login';
import AddUserMain from './pages/user/addUsers';
import EditUserPage from './pages/user/editUsers';
import AddWareHousePage from './pages/warehouse/addWarehouse';

function App() {

  const Private = ({children}) => {
    let authenticated = localStorage.getItem("userInfo");

    if (!authenticated)
        return <Navigate to="/login" />

    return children;
  }

  return (
      <Router>
        <Routes>
          <Route exact path='/' element={ <Private><HomePage /></Private> } />
          <Route exact path='/products/:pageNumber' element={ <Private><ProductPage /></Private> } />
          <Route exact path='/addProduct' element={ <Private><AddProductPage /></Private> } />
          <Route exact path='/product/:id/edit' element={ <Private><EditProductPage /></Private> } />
          <Route exact path='/users/:pageNumber' element={ <Private><UsersPage /></Private> } />
          <Route exact path='/addUser' element={ <Private><AddUserMain /></Private> } />
          <Route exact path='/user/:id/edit' element={ <Private><EditUserPage /></Private> } />
          <Route exact path='/login' element={ <LoginPage /> } />
          <Route exact path='/addWarehouse' element={ <Private><AddWareHousePage/></Private> }></Route>
        </Routes>
      </Router>
  );
}

export default App;
