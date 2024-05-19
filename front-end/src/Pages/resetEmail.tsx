import axios from "axios";
import React, { useEffect } from "react"
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { types } from "../redux/types";
import { toast } from "react-toastify";
import { json } from "react-router-dom";


const ResetEmail : React.FC = () =>{
    const user = useSelector((state:types) => state.reducer.data)
    async function SendEmail(){
        const response = await axios.post(`http://127.0.0.1:8000/api/users/reset-password`, null ,{
            headers:{
                Authorization : `Bearer ${user.token}`
            }
        })
        console.log(response)
        toast.success("Email Sent Successfully")
    }

    // function sendMessage() {
    //     console.log("NICE");
    //     const cartSocket = new WebSocket(`ws://127.0.0.1:8000/ws/cart/`);
    //     cartSocket.onopen = () => {
    //         cartSocket.send(JSON.stringify({ message: user._id}));
    //         console.log("SOCKET OPENED");
    //     };
    //     cartSocket.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log("Message from server: ", data);
    //     };
    //     cartSocket.onerror = (error) => {
    //         console.error("WebSocket error: ", error);
    //     };
    //     cartSocket.onclose = (event) => {
    //         console.log("WebSocket closed: ", event);
    //     };
    // }
    

    return(
        <div className="reset-container">
        <div className="login" style={{minHeight:150}}>
            <div className="title">
                <h3>Reset Password</h3>
                <p>Welcome back!!</p>
            </div>
            <div className="fields">
                {/* <InputFields title="Password" type="password" onChange={setPassword} />
                <InputFields title="Confirm Password" type="password" onChange={setConfirmPassword}/>
                <div className="cart-btn login-btn" onClick={UserLogin}>
                    <Link className="link" to="">Sign In</Link>
                </div> */}
                <div className="send-email-btn" onClick={SendEmail}>
                    <FiSend size={23} color="#fff" style={{marginRight:5}}/>
                    <p>Send Email</p>
                </div>
                {/* <p onClick={sendMessage}>Test Socket</p> */}
   
            </div>
        </div>
    </div>
    )
}

export default ResetEmail