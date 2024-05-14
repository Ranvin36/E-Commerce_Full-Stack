import React, { useEffect, useRef, useState } from "react"
import { useParams,Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaStar } from "react-icons/fa6";
import { GoCodeReview } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/types";
import { MdDeleteOutline } from "react-icons/md";
import Rating from "../Components/rating";
import {action} from "../redux/action"
import { TbWashDryP } from "react-icons/tb";
import { Swiper,SwiperRef,SwiperSlide } from "swiper/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { fetchFavouriteProducts} from "../redux/favouritesReducer"
import { removeFavouritesProduct} from "../redux/favouritesReducer"
import {cartProductsfetchSuccesful} from "../redux/cartReducer"
import {TbShoppingBagPlus} from 'react-icons/tb'
import { HiOutlineArrowSmRight,HiOutlineArrowSmLeft } from "react-icons/hi";
import { RiArrowDropRightLine ,RiArrowDropLeftLine} from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Reviews{
    _id:number,
    name:string,
    comment:number,
    rating:number
    user:[]
}

interface Product{
    _id:number,
    name:string,
    image:string,
    price:number,
    reviews:Reviews[]
}

const ProductDetails : React.FC = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const selector = useSelector((state:types)=> state.reducer.data)
    const [product,setProduct] = useState<Product | null>(null);
    const [review,setReview] = useState("");
    const [recommendation,setRecommendatios] = useState([]);
    const [popupMessage,setPopupMessage] = useState("");
    const [reviewPosted,setReviewPosted] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const swiperRef = useRef<SwiperRef>(null)
    const Navigate = useNavigate()
    async function GetProductDetails(){
        const response = await axios.get<Product>(`http://127.0.0.1:8000/api/products/${id}`)
        setProduct(response.data)
        }
    
    async function SubmitPost(){
        try{
            const reviewData={comment:review,rating:rating}
            const response = await axios.post(`http://127.0.0.1:8000/api/reviews/create/${id}`,reviewData,{
                headers:{
                    Authorization:`Bearer ${selector.token}`
                }
            })
            toast("🤙 Review Posted Successfully")
            // setPopupMessage("Review Posted Succesfully")
            // setReviewPosted(true)
            // setTimeout(()=>{
            //     setReviewPosted(false)
            // },3000)
        }
        catch(error:any){
            console.log(error.response);
            dispatch(action([]))
            Navigate("/login")
            
        }
        
    }

    async function DeleteReview(id:number){
        try{

            const response = await axios.delete(`http://127.0.0.1:8000/api/reviews/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${selector.token}`
                }
            })
            toast.error("Review Deleted Successfully")
        }
        catch(error:any){
            console.log(error.response);
            dispatch(action([]))
            Navigate("/login")
        }

    }

    async function UpdateComment(reviewId:number){
        const response = await axios.patch(`http://127.0.0.1:8000/api/reviews/update/${id}`)
    }

    async function recommendProducts(){
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/products/recommend/${product && product._id}/?query=${product && product.price}`)
            setRecommendatios(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

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

    function handlePrevSlide(){
        swiperRef?.current?.swiper.slidePrev()
    }

    function handleNextSlide(){
        swiperRef?.current?.swiper.slideNext()
    }

    useEffect(()=>{
        recommendProducts()
    },[product])


    useEffect(()=>{
        GetProductDetails()
    },[])
    return(
        <div className="details-container">
            {product ? (
                <React.Fragment>
                    <div className="details-layout">
                        
                        <div className="details-img">
                            <img src={`http://localhost:8000${product.image}`} alt="" />
                        </div>
                        <div className="details-info">
                            <h3>{product.name}</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <h2>${product.price}</h2>
                            <div className="add-to-cart">
                                <p>Add To Cart</p>
                            </div>
                        </div>
    
                    </div>
                    <div className="reviews">
                    <div className={reviewPosted ? "side-popup popup-visible" : "side-popup"}>
                            <GoCodeReview size={25} color="#FF5B76"/>
                        <p>{popupMessage}</p>
                        </div>
                        <h2>Reviews</h2>
                        <div className="write-review">
                            <div className="review-input">
                                <input type="text" placeholder="Write A Review...." onChange={(e)=>setReview(e.target.value)} />
                            </div>
                            <div className="ratings">

                                <Rating number = {1} setRating={setRating} rating={rating}/>
                                <Rating number = {2} setRating={setRating} rating={rating}/>
                                <Rating number = {3} setRating={setRating} rating={rating}/>
                                <Rating number = {4} setRating={setRating} rating={rating}/>
                                <Rating number = {5} setRating={setRating} rating={rating}/>
                            </div>
                            <div className="submit-rating" onClick={SubmitPost}>
                                <button type="button">Post Review</button>
                            </div>
                        </div>
                        
                        {product.reviews ? product.reviews.map(function(item,index:number){
                            const userReview = item.user == selector._id
                            return(
                                <div className="review-details" key={index}>
                                <div className="user-img">
                                    <h3>{item.name && item.name.slice(0,1)}</h3>
                                </div>
                                <div className="review-user-details">
                                    <p>{item.comment}</p>
                                    <div className="rating-layout" style={{display:"flex", alignItems:"center"}}>
                                        <FaStar color="YELLOW"  style={{marginRight:5}}/>
                                        <p>{item.rating}</p>
                                        {userReview &&  (
                                            <div className="review-actions">
                                                <MdDeleteOutline size={18} onClick={()=>DeleteReview(item._id)}/>
                                                <GoCodeReview size={18} onClick={()=>UpdateComment(item._id)}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            )
                        }) :
                            <div className="no-reviews">
                                <p>No Reviews Found</p>
                            </div>
                        }

                        <div className="product-recommendation">
                            <div className="trends-titles"  style={{marginTop:30, marginBottom:15}}>
                                        <div className="best-selling-title">
                                            <h4>Recommendations</h4>
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
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    >
                                        {recommendation && recommendation.map(function(item:Product,index:number){
                                            const ProductUrl = `/product/${item._id}`
                                            return(
                                                <SwiperSlide key={index}>
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
                                                </SwiperSlide>
                                            )
                                        })}

                                        </Swiper>
                                </div>
                        </div>

                    </div>
                </React.Fragment>
            ) : (
                <h1>Product Not Found</h1>
            )}
        </div>
    )
}


export default ProductDetails