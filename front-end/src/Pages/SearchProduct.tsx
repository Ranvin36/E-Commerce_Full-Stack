import React, { useContext, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { types } from "../redux/types"
import {TbShoppingBagPlus} from 'react-icons/tb'
import { Link } from "react-router-dom"
import axios from "axios"
import { searchAction } from "../redux/action"
import { CiFilter } from "react-icons/ci";
import { cartProducts } from "../redux/action"
import {cartProductsfetchSuccesful} from "../redux/cartReducer"
import { SearchContext } from "../context/context"
import { IoIosHeartEmpty } from "react-icons/io";
import { fetchFavouriteProducts} from "../redux/favouritesReducer"
import { removeFavouritesProduct} from "../redux/favouritesReducer"
import Filter from "../Components/Filter"

interface Product {
    _id:number,
    name:string,
    image:string,
    price:number
}


const SearchProduct : React.FC = () =>{
    const selector = useSelector((state:types)=> state.searchReducer.data)
    const dispatch = useDispatch()
    const search = useContext(SearchContext)
    // const [minprice, setMinPrice] = useState("")
    // const [maxPrice, setMaxPrice] = useState("")

    // async function HandleFilter(){
    //     try{
    //         const response = await axios.post(`http://127.0.0.1:8000/api/search/price/?query=${search.search}&max=${maxPrice}&min=${minprice}`)
    //         dispatch(searchAction(response.data))
    //     }
    //     catch(error){
    //         console.log("Error : "+ error)
    //     }
    // }

    function AddToCart(item:Product){
        try{
            dispatch(cartProductsfetchSuccesful([item]))
        }
        catch(error){
            console.log("ERROR " + error)
        }
    }

    function AddToFavourites(item:Product){
        try{
            dispatch(fetchFavouriteProducts([item]))
        }
        catch(error){
            console.log("ERROR : " + error)
        }
    }

    function removeFromfavourites(id:number){
        try{
            dispatch(removeFavouritesProduct(id))
        }
        catch(error){

        }
    }

    return(

        <div className="search-container">
            <div className="search-title">
                <h3>Products Found : {selector.length}</h3>
            </div>
            <Filter type="normal"/>
            <div className="search-products">
                {selector && selector.map(function(item : Product,index:number){
                    const ProductUrl = `/product/${item._id}`
                    return(
                            <div key={index} className="search-product">
                                <div className="favourites-container" onClick={()=>AddToFavourites(item)}>
                                    <IoIosHeartEmpty style={{color:"rgb(255, 91, 118)"}} size={20}/>
                                </div>
                                <Link className="product-img" to={ProductUrl}>
                                    <img src={`http://localhost:8000${item.image}`} alt="product-image" />
                                </Link>
                                <div className="product-details">
                                    <h3>{item.name}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <div className="product-cart">
                                    <TbShoppingBagPlus  size={23} className="product-cart-icon" onClick={()=>AddToCart(item)}/>
                                </div>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SearchProduct