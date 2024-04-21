import React, { useState } from "react"
import { Link } from "react-router-dom"
import InputFields from "../Components/InputFields"
import axios from "axios"
const Register : React.FC = () =>{
    const[username,setUsername] = useState<string>("")
    const[email,setEmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const data = {username,email,password}
    async function RegisterUser(){
        if(data){
            console.log("INSIDE")
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/register",data)
                console.log(response)
            }
            catch{
                console.log("Username Already Exists")
            }
        }
    }
    return(
        <div className="login-container">
            <div className="login">
                <div className="title">
                    <h3>Register</h3>
                    <p>Introduce Yourself!!</p>
                </div>
                <div className="fields">
                    <InputFields title="Username" type="text" onChange={setUsername}  />
                    <InputFields title="Email Address" type="email" onChange={setEmail}/>
                    <InputFields title="Password" type="password" onChange={setPassword}/>
                    <div className="cart-btn" onClick={RegisterUser}>
                        <Link className="link" to="">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register