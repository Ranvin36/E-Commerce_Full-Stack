
import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import InputFields from "../Components/InputFields"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import action from "../redux/action"
import { types } from "../redux/types"
const Login : React.FC = () => {
    const[username,setUsername] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[error,setError] = useState<string>("")
    const data ={username,password}
    const dispatch = useDispatch()

    async function UserLogin(){
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/login",data)
            console.log(dispatch(action(response.data)))
        }
        catch{
            setError('Invalid Email Or Password')
        }
    }
    return(
        <div className="login-container">
            <div className="login">
                <div className="title">
                    <h3>Login</h3>
                    <p>Welcome back!!</p>
                    <p className="error-text">{error && error}</p>
                </div>
                <div className="fields">
                    <InputFields title="Email Address" type="email" onChange={setUsername} />
                    <InputFields title="Password" type="password" onChange={setPassword}/>
                    <div className="cart-btn" onClick={UserLogin}>
                        <Link className="link" to="">Sign In</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Login