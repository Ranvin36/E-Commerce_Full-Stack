
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import InputFields from "../Components/InputFields"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {action} from "../redux/action"
import { types } from "../redux/types"
import { GoCodeReview } from "react-icons/go";
import { TbUserX } from "react-icons/tb";


const Login : React.FC = () => {
    const[username,setUsername] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[error,setError] = useState<string>("")
    const[errorFound,setErrorFound] = useState<boolean>(false)
    const data ={username,password}
    const dispatch = useDispatch()
    const Navigation = useNavigate()

    async function UserLogin(){
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/users/login",data)
            dispatch(action(response.data))
            Navigation('/')
        }
        catch{
            setError('Invalid Email Or Password')
            setErrorFound(true)
            setTimeout(()=>{
                setErrorFound(false)
            },3000)
        }
    }
    return(
        <div className="login-container">
               <div className={errorFound ? "side-popup2 popup-visible2" : "side-popup2"}>
                    <TbUserX size={25} color="#FF5B76"/>
                    <p>{error}</p>
                </div>
            <div className="login">
                <div className="title">
                    <h3>Login</h3>
                    <p>Welcome back!!</p>
                </div>
                <div className="fields">
                    <InputFields title="Username" type="text" onChange={setUsername} />
                    <InputFields title="Password" type="password" onChange={setPassword}/>
                    <div className="cart-btn login-btn" onClick={UserLogin}>
                        <Link className="link" to="">Sign In</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Login