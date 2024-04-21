import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Navbar from './Components/navbar';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
