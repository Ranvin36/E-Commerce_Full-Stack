import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import { IoStar } from "react-icons/io5";
import { useSelector } from "react-redux";
import { types } from "../redux/types";
import { RiArrowDropRightLine ,RiArrowDropLeftLine} from "react-icons/ri";
import {Swiper,SwiperRef, SwiperSlide} from "swiper/react";
import { Link } from "react-router-dom";
import Product from "../Components/product";

interface ProductDetails{
    _id:number,
    name:string,
    image:string,
    price:string,
    reviews:ReviewDetails[]
}
interface ProductRecommendations{
    _id:number,
    name:string,
    image:string,
    price:number,
    reviews:ReviewDetails[]
}

interface ReviewDetails{
    _id:number
}

interface Product{
    product:ProductDetails,
}


const Cart : React.FC = () =>{
    const user = useSelector((state:types) => state.reducer.data)
    const [cart,setCart] = useState([])
    const [recommendations,setRecommendations] = useState([])
    let recommendNames = ""; 
    const cartLength = cart.length
    let totalPrice:number = 10;
    const additionalCost:number = 10;
    const swiperRef = useRef<SwiperRef>(null)

    async function GetCartProduct(){
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/cart/products/`,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            setCart(response.data)
        }
        catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        GetCartProduct()
    },[])


    cart.forEach(function(item:Product,index){
        let productNames = item.product.name.split(" ")
        if(!recommendNames.includes(productNames[0])){
            const addName = index > 0 ? ", " + productNames[0] : ""+ productNames[0]
            recommendNames+=addName
        }

    })


    async function recommendProducts(){
        if(recommendNames.length > 0){
            const response = await axios.get(`http://127.0.0.1:8000/api/cart/recommendation/?category=${recommendNames}`,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            
            setRecommendations(response.data)
        }
    }

    useEffect(()=>{
        recommendProducts()
    },[recommendNames])


    function handlePrevSlide(){
        swiperRef?.current?.swiper?.slidePrev()
        
    }
    function handleNextSlide(){
        swiperRef?.current?.swiper?.slideNext()
    }

    return(
        <div className="cart-container">
            <div className="cart-layout">
                <div className="cart-title">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="cart-check-section">                    
                    <div className="cart-products-container">
                        {cart && cart.map(function(item:Product,index){
                            const productImage = `http://127.0.0.1:8000${item.product.image}`;
                            const reviewsLength= item.product.reviews.length
                            totalPrice+=parseInt(item.product.price)
                            return(
                                <React.Fragment key={index}>
                                    {index != 0 &&  <div className="cart-line"></div>}
                                    <div className="cart-product">
                                        <div className="cart-img">
                                            <img src={productImage} alt="product-image"/>
                                        </div>
                                        <div className="cart-product-details">
                                            <h3>{item.product.name}</h3>
                                            <p>${item.product.price}</p>
                                            <div className="rating-layout">
                                                <p>4.7</p>
                                                <div className="rating-starts">
                                                    <IoStar/>
                                                    <IoStar/>
                                                    <IoStar/>
                                                    <IoStar/>
                                                </div>
                                                <p>({reviewsLength > 0 ? reviewsLength : "No"} Reviews)</p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="checkout-section">
                        <div className="checkout-layout">
                            <h3>Order Summary</h3>
                            <div className="total-price">
                                <h4>Items :</h4>
                                <h4>{cartLength}</h4>
                            </div>
                            <div className="total-price">
                                <h4>Additional Cost: </h4>
                                <h4>${additionalCost}</h4>
                            </div>
                            <div className="total-price">
                                <h4>Total Price: </h4>
                                <h4>${totalPrice}</h4>
                            </div>
                            <div className="checkout-btn">
                                <p>Checkout</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-recommendations">
                    <div className="trends-titles">
                            <div className="cart-title">
                                <h2>Recommendations</h2>
                            </div>
                            <div className="arrows">
                                <div className="trends-arrow-btns">
                                    <button onClick={handlePrevSlide} className="arrow-bg"><RiArrowDropLeftLine size={45} className="arrow-icon" color="#fff"/></button>
                                    <button onClick={handleNextSlide} className="arrow-bg"><RiArrowDropRightLine size={45} className="arrow-icon" color="#fff"/></button>
                                </div>
                            </div>
                    </div>
                    <div className="recommendation-swiper">
                        <Swiper
                            ref={swiperRef}
                            slidesPerView={4}
                            spaceBetween={10}
                        >
                            {recommendations && recommendations.map(function(item:ProductRecommendations,index){
                                const ProductUrl = `/product/${item._id}`
                                return(
                                    <SwiperSlide key={index}>
                                        <Product item={item} />
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart