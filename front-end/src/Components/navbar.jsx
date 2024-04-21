import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { useState } from "react";
import {useSelector} from 'react-redux'
function Navbar(){
    const[expand, setExpand] = useState(false)
    const selector = useSelector((state)=> state.reducer.data)
    console.log(selector + "FROM NAVBAR")
    return(
        <div className="navbar">
            <div className="options">
                <div className="logo">
                    <h3>Flee<span>xy</span></h3>
                </div>
                <div className="bar" onClick={()=>setExpand((prev)=> !prev)}>
                    <HiOutlineBars3BottomRight size={25}/>
                </div>
            </div>
            <ul style={{display:expand?"block" : null}}>
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/">Explore</Link></li>
                <li><Link className="link" to="/">Trending</Link></li>
                <li><Link className="link" to="/">Search</Link></li>
                <li><Link className="link" to="/">Contact</Link></li>
            </ul>
            <div className="cart-btn nav-cart" style={{display:expand?"block" : null}}>
                <Link className="link" to="/">{selector.username}</Link>
            </div>

        </div>
    )
}

export default Navbar