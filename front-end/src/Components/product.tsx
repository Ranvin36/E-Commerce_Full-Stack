import React from "react"
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/types";
import { IoIosHeartEmpty } from "react-icons/io";
import {FaHeart } from "react-icons/fa"
import axios from "axios";
import { toast } from "react-toastify";
import { clearFavourites, removeFavouritesProduct,fetchFavouriteProducts } from "../redux/favouritesReducer";
import { cartProductsfetchSuccesful } from "../redux/cartReducer";
import { clearCart, removeProductFromCart } from "../redux/cartReducer";

interface ProductItem {
    _id:number,
    name:string,
    image:string,
    price:number
}

interface Productprops{
    item:ProductItem
}

interface CartItem{
    _id:number
    product:ProductItem
}

const Product : React.FC<Productprops>= ({item}) =>{
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    const user = useSelector((state:types) => state.reducer.data)
    const favouritesReducer = useSelector((state:types) => state.favouritesReducer.data)
    const cartReducer = useSelector((state: types) => state.cartReducer.data as CartItem[]);
    async function AddToCart(productId:number){
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/${productId}`,null,{
                headers:{
                    Authorization:  `Bearer ${user.token}`
                }
            })
            dispatch(cartProductsfetchSuccesful([response.data]))
            console.log(response)
            toast.success("🤙 Added To Cart")
        }
        catch(error){
            console.log("ERROR : " + error)
        }
    }

    async function AddToFavourites(productId:number){
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/favourites/add/${productId}`,null,{
                headers:{
                    Authorization:  `Bearer ${user.token}`
                }
            })
            dispatch(fetchFavouriteProducts([response.data]))
            console.log(response)
            toast.success("🤙 Added To Favourites")
        }
        catch(error){
            console.log("ERROR : " + error)
        }
    }

    
    function removeFromfavourites(id:number){
        try{
            const response = axios.delete(`http://127.0.0.1:8000/api/favourites/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            } )
            console.log(response)
            dispatch(removeFavouritesProduct(id))
            toast.error("Removed From Favourites")
        }
        catch(error){
            console.log(error)
        }
    }

    function removeFromCart(id:number){
        try{
            const response = axios.delete(`http://127.0.0.1:8000/api/cart/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            console.log(response)
            dispatch(removeProductFromCart(id))
            toast.error("Removed From Cart")

        }   
        catch(error){
            console.log(error)
        }
    }

    function ViewProduct(id:number){
        navigate(`/product/${id}`)
    }

    const filterProduct = favouritesReducer.filter((favourite) => favourite.product._id === item._id);
    const cartFilter = cartReducer.filter((cart)=> cart.product._id === item._id);
    return(
        <div className="product-layout">
             <div className="favourites-container" onClick={()=> filterProduct.length>0  ? removeFromfavourites(item._id) : AddToFavourites(item._id)}>
                {filterProduct.length>0 ? 
                    <FaHeart  size={16}  style={{color:"rgb(255, 91, 118)"}}/>
                    :
                    <IoIosHeartEmpty style={{color:"rgb(255, 91, 118)"}} size={20}/>
                }
            </div>
            <div className="product-content" onClick={()=>ViewProduct(item._id)}>
                    <div className="product-image">
                        <img src={`http://localhost:8000/${item.image}`} alt="" />
                    </div>
                    <div className="product-details">
                        <h3>{item.name.length>=19 ? item.name.slice(0,19)+".." : item.name}</h3>
                        <div className="rating-sold">
                            <FaStar color="#eff781"/>
                            <p>4.7</p>
                            <div className="line"></div>
                            <p>45 Sold</p>
                        </div>
                        <p>${item.price}</p>
                    </div>
            </div>
            <div className="product-cart" onClick={()=> cartFilter.length >0 ?  removeFromCart(item._id) :AddToCart(item._id) } style={{backgroundColor:cartFilter.length>0?"#fff":"#FF5B76"}}>
                <TbShoppingBagPlus  size={23} className="product-cart-icon" color={cartFilter.length>0 ? "#FF5B76" :"#fff"} />
            </div>
        </div>
    )
}

export default Product
