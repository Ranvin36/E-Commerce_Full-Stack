import React, { useContext, useEffect } from "react";
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
import { searchAction,action } from "../redux/action";
import { CiShoppingCart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { SearchContext } from "../context/context";
import { removeProductFromCart } from "../redux/cartReducer";
import { removeFavouritesProduct,fetchFavouriteProducts } from "../redux/favouritesReducer";
import { toast } from "react-toastify";
import {types} from '../redux/types'

function Navbar(){
    const[expand, setExpand] = useState(false)
    const[cartReveal, setCartReveal] = useState(false)
    const[favouritesReveal, setfavouritesReveal] = useState(false)
    const[cartReducer, setCartReducer] = useState([])
    const[favouritesReducer, setFavouritesReducer] = useState([])
    const[width, setWidth] = useState('')
    const selector = useSelector((state)=> state.reducer.data)
    const cartReducers = useSelector((state) => state.cartReducer.data)
    const favouritesReducers = useSelector((state) => state.favouritesReducer.data)
    const searchContext = useContext(SearchContext)
    const search = searchContext.search
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

    async function DeleteProduct(id){
        dispatch(removeProductFromCart(id))
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/cart/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${selector.token}`
                }
            })
            toast.error("Product Deleted From Cart")
        }   
        catch(error){
            console.log("Error : " + error)
        }
    }

    function ProfileNavigate(){
        Navigation(`/profile/${selector._id}`)
    }

    async function removeFromfavourites(id){
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/favourites/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${selector.token}`
                }
            })
            console.log(response)
            dispatch(removeFavouritesProduct(id))
            toast.error("🤙 Removed From Favourites")

        }   
        catch(error){
            console.log("Error : " + error)
        }
    }

    async function getProductInCart(){
        try{
            const response = await axios.get("http://127.0.0.1:8000/api/cart/products/",{
                headers:{
                    Authorization:`Bearer ${selector.token}`
                }
            })
            console.log(response.data)
            setCartReducer(response.data)
        }
        catch(error){
            dispatch(action([]))
            Navigation("/login")
        }
    }

    async function getProductInFavourites(){
        try{
            const response = await axios.get("http://127.0.0.1:8000/api/favourites/products/",{
                headers:{
                    Authorization:`Bearer ${selector.token}`
                }
            })
            console.log(response.data)
            setFavouritesReducer(response.data)
        }
        catch(error){
            // dispatch(action([]))
            // Navigation("/login")
            console.log("error")
        }
    }

    useEffect(()=>{
        function AdjustWidth(){
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize',AdjustWidth)
        return () =>{
            window.removeEventListener('resize',AdjustWidth)
        }
    },[])

    console.log(width)

    useEffect(()=>{
        getProductInFavourites()
    },[favouritesReducers])

    useEffect(()=>{
        getProductInCart()
    },[cartReducers])
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
            <div className={!expand? "search-bar hide-icons" : "search-bar"}>
                    <input type="text" placeholder="Search A Product"  onChange={(e)=>searchContext.setSearch(e.target.value)} onKeyPress={(event)=>keyPress(event)}/>
                    <div className="search-bg">
                        <CiSearch onClick={Finding} />
                    </div>
            </div>
            <div className={!expand? "corner-icons hide-icons" : "corner-icons"}>
                <div className="user-profile desk-nav-link" onClick={ProfileNavigate}>
                    <AiOutlineUser size={20}/>
                </div>
                <div className="mobile-nav-link">
                    <Link>Profile</Link>
                </div>
                <div className="mobile-nav-link">
                    <Link>Favourites</Link>
                </div>
                <div className="favourites desk-nav-link">
                    <IoIosHeartEmpty size={20} onClick={()=>setfavouritesReveal((prev)=>!prev)}/>
                    <div className={favouritesReveal ? "cart-dropdown drop-down-visible" : "cart-dropdown"}>
                        <div className="cart-elements">
                            {favouritesReducer.length>0 && ( <h3>Your Favourites</h3>)}
                            {favouritesReducer.length>0 ? favouritesReducer && favouritesReducer.map((item,index)=>{
                                return(
                                 <React.Fragment key={index}>
                                        <div className="cart-product-layout">
                                            <img src={`http://localhost:8000${item.product.image}`} alt="" />
                                            <Link className="cart-product-details" to={`/product/${item.product._id}`}style={{textDecoration:"none"}} >
                                                <p style={{color:"#777"}}>{item.product.name}</p>
                                            </Link>
                                            <MdDeleteOutline onClick={()=>removeFromfavourites(item.product._id)} size={20}/>
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
                <div className="mobile-nav-link">
                    <Link>Cart</Link>
                </div>
                <div className="trending desk-nav-link" onClick={(e)=> setCartReveal((prev)=>!prev)}>
                    <CiShoppingCart size={22}/>
                    <div className={cartReveal ? "cart-dropdown drop-down-visible" : "cart-dropdown"}>
                        <div className="cart-elements">
                            {cartReducer.length>0 ? cartReducer && cartReducer.map((item,index)=>{
                                return(
                                 <React.Fragment key={index}>
                                        <div className="cart-product-layout">
                                            <img src={`http://localhost:8000${item.product.image}`} alt="" />
                                            <div className="cart-product-details">
                                                <p>{item.product.name}</p>
                                                <p>${item.product.price}</p>
                                            </div>
                                            <MdDeleteOutline onClick={()=>DeleteProduct(item.product._id)} size={20}/>
                                        </div>
                                </React.Fragment>       
                                )
                            }) :
                                <p>Cart Is Empty</p>
                            }
                            <div className="view-cart">
                                <Link style={{color:"#fff", textDecoration:"none"}} to='/cart'>View Cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-btn nav-cart desk-nav-link">
                    <Link className="link" to="/">{selector.username ? selector.username : "Login"}</Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar