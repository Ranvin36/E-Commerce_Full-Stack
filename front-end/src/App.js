import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Navbar from './Components/navbar';
import Footer from './Components/Footer.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import SearchProduct from "./Pages/SearchProduct.tsx"
import ProductDetails from "./Pages/ProductDetails.tsx"
import Profile from "./Pages/Profile.tsx"
import Category from './Pages/Category.tsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/search' element={<SearchProduct/>}/>
        <Route path='/category/:id' element={<Category/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='product/:id' element={<ProductDetails/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
