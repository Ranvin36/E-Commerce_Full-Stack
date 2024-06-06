import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { types } from "../redux/types"
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

interface ProductDetails{
    name:string,
    image:string,
    price:number
}

interface Product{
    product:ProductDetails
}


const Profile : React.FC = () =>{
    const selector = useSelector((state:types)=> state.reducer.data)
    const[cart,setCart] = useState([])
    const[favourites,setFavourites] = useState([])
    async function getCartProduct(){
        const response = await axios.get(`http://127.0.0.1:8000/api/cart/products/`,{
            headers:{
                Authorization:  `Bearer ${selector.token}`
            }
        })
        setCart(response.data)

    }
    async function getfavouritesProducts(){
        const response = await axios.get(`http://127.0.0.1:8000/api/favourites/products/`,{
            headers:{
                Authorization:  `Bearer ${selector.token}`
            }
        })
        setFavourites(response.data)

    }

    useEffect(() =>{
        getCartProduct()
    },[])

    useEffect(() =>{
        getfavouritesProducts()
    },[])
    return(
        <div className="profile-container">
            <div className="details-activities">
               <div className="user-details">
                        <div className="user-image">
                            <p>{selector.username && selector.username.slice(0,1)}</p>
                        </div>
                        <div className="user-info">
                             <p>{selector.username && selector.username}</p>
                             <p>{selector.email && selector.email}</p>
                        </div>
                        {/* <div className="activity-summary">
                            <p>Reviews - 5</p>
                            <p>Orders - 10</p>
                        </div> */}
                </div> 
               <div className="user-activities">
                    <div className="activities-title">
                        <h3>Activities</h3>
                    </div>
                    <div className="orders activities-section">
                        <div className="activities-title">
                            <h3 style={{fontSize:23}}>Favourites</h3>
                            <div className="section-line"></div>
                        </div>
                        {favourites.length > 0 ? favourites && favourites.map(function(item:Product,index){
                            const image = `http://127.0.0.1:8000${item.product.image}`
                            return(
                                <div className="activities-grid">
                                <div className="favourites-image">
                                    <img src={image} alt="product-image" />
                                </div>
                                <h3>{item.product.name}</h3>
                                <p>${item.product.price}</p>
                                <MdDeleteOutline/>
                            </div>
                            )
                        })

                        :
                        <div className="profile-empty">
                            <h1>No Favourotes Found</h1>
                        </div>
                        }
                    </div>
                    <div className="orders activities-section">
                        <div className="activities-title">
                            <h3 style={{fontSize:23}}>Reviews</h3>
                            <div className="section-line"></div>
                        </div>
                        <div className="activities-grid">
                            <p>Nice Product! Can I Contact You Personally?</p>
                            <div className="editable-icons">
                                <MdDeleteOutline/>
                                <MdDeleteOutline/>
                            </div>
                        </div>
                        <div className="activities-grid">
                            <p>Nice Product! Can I Contact You Personally?</p>
                            <div className="editable-icons">
                                <MdDeleteOutline/>
                                <MdDeleteOutline/>
                            </div>
                        </div>

                    </div>
                    <div className="orders activities-section">
                        <div className="activities-title">
                            <h3 style={{fontSize:23}}>Orders</h3>
                            <div className="section-line"></div>
                        </div>
                        {cart.length > 0 ? cart && cart.map(function(item:Product,index){
                            const image = `http://127.0.0.1:8000${item.product.image}`
                            return(
                                <div className="activities-grid">
                                <div className="favourites-image">
                                    <img src={image} alt="product-image" />
                                </div>
                                <h3>{item.product.name}</h3>
                                <p>${item.product.price}</p>
                                <MdDeleteOutline/>
                            </div>
                            )
                        })

                        :
                            <div className="profile-empty">
                                <h1>No Orders Placed</h1>
                            </div>
                        }


                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Profile