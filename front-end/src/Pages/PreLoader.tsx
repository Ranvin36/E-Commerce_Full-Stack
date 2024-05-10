import React from "react"
import { Link } from "react-router-dom"
const PreLoader : React.FC = () =>{
    return(
        <div className="preloader">
             <div className="logo preloader-logo">
                <div className="blur" style={{top:50, right:0}}></div>          
                    <img src="images/logo.png" className="preloader-img" style={{width:180,marginBottom:-50}} />
                    <Link className="logo" to='/' style={{textAlign:"center"}}>
                        <h3>Flee<span>xy</span></h3>
                    </Link>
                </div>

        </div>
    )
}

export default PreLoader