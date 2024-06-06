import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

interface props{
    message:string
}

const PreLoader : React.FC<props> = ({message}) =>{
    const Navigate = useNavigate()
    function NavigateTo(){
        setTimeout(()=>{
            Navigate('/')
        },5000)
    }

    useEffect(()=>{
        NavigateTo()
    },[])
    return(
        <div className="preloader">
             <div className="logo preloader-logo">
                <div className="blur" style={{top:50, right:0}}></div>  
                    <div className="preloader-content">                        
                        <img src="images/logo.png" className="preloader-img" style={{width:180,marginBottom:-50}} />
                        <p>{message}</p>
                    </div>        
                </div>

        </div>
    )
}

export default PreLoader