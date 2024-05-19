import logo from './logo.svg';
import './App.css';
import { Navigate, Route,Routes } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Navbar from './Components/navbar';
import Footer from './Components/Footer.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import SearchProduct from "./Pages/SearchProduct.tsx"
import ProductDetails from "./Pages/ProductDetails.tsx"
import Profile from "./Pages/Profile.tsx"
import Category from './Pages/Category.tsx';
import PreLoader from './Pages/PreLoader.tsx'
import { useSelector } from 'react-redux';
import { Flip, ToastContainer, toast } from 'react-toastify';
import ResetPasswordConfrimation from "./Pages/resetPassword.tsx"
import ResetEmail from "./Pages/resetEmail.tsx"
import Cart from "./Pages/cart.tsx"
function App() {
  const user = useSelector((state) => state.reducer.data)
  const loggedIn = () =>{
    return user.token && user.token.length>0
  }
  return (
    <div>
      <Routes>
        <Route path='/preloader' element={<PreLoader/>}/>

      </Routes>
      <Navbar/>
      <ToastContainer position='bottom-right' theme='dark' transition={Flip} stacked />
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/register' element={ <Home/> }/>
        <Route path='/login' element={  <Login/>}/>
        <Route path='/search' element={<SearchProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/category/:id' element={<Category/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='product/:id' element={<ProductDetails/>}/>
        <Route path='reset/email' exact  element={<ResetEmail/>}/>
        <Route path='password/reset' exact  element={<ResetPasswordConfrimation/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
