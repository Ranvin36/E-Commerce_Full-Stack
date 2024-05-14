import React, { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { types } from "../redux/types"
import {TbShoppingBagPlus} from 'react-icons/tb'
import { Link } from "react-router-dom"
import axios from "axios"
import { searchAction } from "../redux/action"
import {FaHeart } from "react-icons/fa"
import { CiFilter } from "react-icons/ci";
import { cartProducts } from "../redux/action"
import {cartProductsfetchSuccesful} from "../redux/cartReducer"
import { SearchContext } from "../context/context"
import { IoIosHeartEmpty } from "react-icons/io";
import { fetchFavouriteProducts} from "../redux/favouritesReducer"
import { removeFavouritesProduct} from "../redux/favouritesReducer"
import { clearFavourites} from "../redux/favouritesReducer"
import Filter from "../Components/Filter"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Product from "../Components/product"


interface Product {
    _id:number,
    name:string,
    image:string,
    price:number
}


const SearchProduct : React.FC = () =>{
    const user = useSelector((state:types) =>state.reducer.data)
    const selector = useSelector((state:types)=> state.searchReducer.data)
    const favouritesReducer = useSelector((state:types) => state.favouritesReducer.data)
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
                    const filterProduct = favouritesReducer.filter((productData) => productData._id === item._id)
                    const ProductUrl = `/product/${item._id}`
                    return(
                            <React.Fragment>
                                <Product item={item}/>
                            </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
export default SearchProduct