import React,{useState} from "react"
import InputFields from "../Components/InputFields"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { types } from "../redux/types"

const ResetPasswordConfrimation : React.FC = () =>{
    const Navigate = useNavigate()
    const user = useSelector((state:types) => state.reducer.data)
    const params = new URLSearchParams(window.location.search)
    const uidb = params.get('uidb64')
    const token = params.get('token')
    const [password,setPassword] =  useState('')
    const [confirmPassword,setConfirmPassword] =  useState('')

    async function UserLogin(){
        const data={password,New_Password:confirmPassword}
        const response = await axios.post(`http://127.0.0.1:8000/api/users/reset-password/confirmation/?uidb64=${uidb}&token=${token}`,data,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        })
        Navigate("/login")
    }   


    return(
     <div className="reset-container">
     <div className="login">
         <div className="title">
             <h3>Reset Password</h3>
             <p>Welcome back!!</p>
         </div>
         <div className="fields">
             <InputFields title="Password" type="password" onChange={setPassword} />
             <InputFields title="Confirm Password" type="password" onChange={setConfirmPassword}/>
             <div className="cart-btn login-btn" onClick={UserLogin}>
                 <Link className="link" to="">Reset Password</Link>
             </div>

         </div>
     </div>
 </div>
    )
}

export default ResetPasswordConfrimation