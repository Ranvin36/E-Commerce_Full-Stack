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
import { removeFavouritesProduct } from "../redux/favouritesReducer";
interface ProductItem {
    _id:number,
    name:string,
    image:string,
    price:number
}

interface Productprops{
    item:ProductItem
}

const Product : React.FC<Productprops>= ({item}) =>{
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    const user = useSelector((state:types) => state.reducer.data)
    const favouritesReducer = useSelector((state:types) => state.favouritesReducer.data)
    async function AddToCart(productId:number){
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/${productId}`,null,{
                headers:{
                    Authorization:  `Bearer ${user.token}`
                }
            })
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
            console.log(response)
            toast.success("🤙 Added To Favourites")
        }
        catch(error){
            console.log("ERROR : " + error)
        }
    }

    function removeFromfavourites(id:number){
        console.log("INside")
        try{
            dispatch(removeFavouritesProduct(id))
        }
        catch(error){

        }
    }
    function ViewProduct(id:number){
        navigate(`/product/${id}`)
    }
    console.log(favouritesReducer)
    const filterProduct = favouritesReducer.filter((productData) => productData.product._id === item._id)
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
            <div className="product-cart" onClick={()=>AddToCart(item._id)}>
                <TbShoppingBagPlus  size={23} className="product-cart-icon"/>
            </div>
        </div>
    )
}

export default Product
