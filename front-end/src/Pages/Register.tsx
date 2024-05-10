import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputFields from "../Components/InputFields"
import axios from "axios"
import { GoCodeReview } from "react-icons/go";

const Register : React.FC = () =>{
    const Navigate = useNavigate();
    const[username,setUsername] = useState<string>("")
    const[email,setEmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[errorMessage,setErrorMessage] = useState<string>("")
    const[errorFound,setErrorFound] = useState<boolean>(false)
    const data = {username,email,password}
    async function RegisterUser(){
        if(data){
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/users/register",data)
              
                Navigate("/login")
            }
            catch(error:any){
                console.log(error.response.data.Message)
                setErrorMessage(error.response.data.Message)
                setErrorFound(true)
                setTimeout(()=>{
                    setErrorFound(false)
                },3000)
            }
        }
    }
    return(
        <div className="login-container">
             <div className={errorFound ? "side-popup2 popup-visible2" : "side-popup2"}>
                            <GoCodeReview size={25} color="#FF5B76"/>
                        <p>{errorMessage}</p>
                        </div>
            <div className="login">
                <div className="title">
                    <h3>Register</h3>
                    <p>Introduce Yourself!!</p>
                </div>
                <div className="fields">
                    <InputFields title="Username" type="text" onChange={setUsername}  />
                    <InputFields title="Email Address" type="email" onChange={setEmail}/>
                    <InputFields title="Password" type="password" onChange={setPassword}/>
                    <div className="cart-btn login-btn" onClick={RegisterUser}>
                        <Link className="link" to="">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register