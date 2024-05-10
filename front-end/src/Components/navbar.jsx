import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { CiSearch } from "react-icons/ci";
import { AiOutlineUser,AiOutlineFire } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { search } from "../redux/action";
import axios from "axios";
import { searchAction } from "../redux/action";
import { CiShoppingCart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { SearchContext } from "../context/context";
import { removeProductFromCart } from "../redux/cartReducer";
import { removeFavouritesProduct } from "../redux/favouritesReducer";

function Navbar(){
    const[expand, setExpand] = useState(false)
    const[cartReveal, setCartReveal] = useState(false)
    const[favouritesReveal, setfavouritesReveal] = useState(false)
    const selector = useSelector((state)=> state.reducer.data)
    const searchContext = useContext(SearchContext)
    const cartReducer = useSelector((state) => state.cartReducer.data)
    const favouritesReducer = useSelector((state) => state.favouritesReducer.data)
    const search = searchContext.search
    console.log(favouritesReducer)
    const Navigation = useNavigate()
    const dispatch=useDispatch()
    async function Finding(){
        if(search){
            const response = await axios.get(`http://127.0.0.1:8000/api/products/search/?query=${search}`)
            dispatch(searchAction(response.data))
            Navigation("/search")
        }
    }
    function keyPress(event){
        if(event.key ==='Enter'){
            Finding()
        }
    }
    
    function DeleteProduct(id){
        console.log(id)
        dispatch(removeProductFromCart(id))
    }

    function ProfileNavigate(){
        Navigation(`/profile/${selector._id}`)
    }

    function removeFromfavourites(id){
        console.log(id)
        try{
            dispatch(removeFavouritesProduct(id))
        }
        catch(error){

        }
    }

    return(
        <div className="navbar">
            <div className="options">
                <Link className="logo" to='/'>
                    <h3>Flee<span>xy</span></h3>
                </Link>
                <div className="bar" onClick={()=>setExpand((prev)=> !prev)}>
                    <HiOutlineBars3BottomRight size={25}/>
                </div>
            </div>
            {/* <ul style={{display:expand?"block" : null}}>
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/">Explore</Link></li>
                <li><Link className="link" to="/">Trending</Link></li>
                <li><Link className="link" to="/">Search</Link></li>
                <li><Link className="link" to="/">Contact</Link></li>
            </ul> */}
            <div className="search-bar">
                    <input type="text" placeholder="Search A Product"  onChange={(e)=>searchContext.setSearch(e.target.value)} onKeyPress={(event)=>keyPress(event)}/>
                    <div className="search-bg">
                        <CiSearch onClick={Finding} />
                    </div>
            </div>
            <div className="corner-icons">
                <div className="user-profile" onClick={ProfileNavigate}>
                    <AiOutlineUser size={20}/>
                </div>
                <div className="favourites">
                    <IoIosHeartEmpty size={20} onClick={()=>setfavouritesReveal((prev)=>!prev)}/>
                    <div className={favouritesReveal ? "cart-dropdown drop-down-visible" : "cart-dropdown"}>
                        <div className="cart-elements">
                            {favouritesReducer.length>0 && ( <h3>Your Favourites</h3>)}
                            {favouritesReducer.length>0 ? favouritesReducer && favouritesReducer.map((item,index)=>{
                                return(
                                 <React.Fragment key={index}>
                                        <div className="cart-product-layout">
                                            <img src={`http://localhost:8000${item.image}`} alt="" />
                                            <Link className="cart-product-details" to={`/product/${item._id}`}style={{textDecoration:"none"}} >
                                                <p style={{color:"#777"}}>{item.name}</p>
                                            </Link>
                                            <MdDeleteOutline onClick={()=>removeFromfavourites(item._id)} size={20}/>
                                        </div>
                                </React.Fragment>       
                                )
                            }) :
                            <div className="empty-tag">
                                <p>Empty</p>
                            </div>

                            
                            }
                        </div>
                    </div>
                </div>
                <div className="trending" onClick={(e)=> setCartReveal((prev)=>!prev)}>
                    <CiShoppingCart size={22}/>
                    <div className={cartReveal ? "cart-dropdown drop-down-visible" : "cart-dropdown"}>
                        <div className="cart-elements">
                            {cartReducer.length>0 ? cartReducer && cartReducer.map((item,index)=>{
                                return(
                                 <React.Fragment key={index}>
                                        <div className="cart-product-layout">
                                            <img src={`http://localhost:8000${item.image}`} alt="" />
                                            <div className="cart-product-details">
                                                <p>{item.name}</p>
                                                <p>${item.price}</p>
                                            </div>
                                            <MdDeleteOutline onClick={()=>DeleteProduct(item._id)} size={20}/>
                                        </div>
                                </React.Fragment>       
                                )
                            }) :
                                <p>Cart Is Empty</p>

                            
                            }
                            <div className="view-cart">
                                <Link style={{color:"#fff", textDecoration:"none"}}>View Cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-btn nav-cart" style={{display:expand?"block" : null}}>
                    <Link className="link" to="/">{selector.username ? selector.username : "Login"}</Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar