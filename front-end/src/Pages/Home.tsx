import React, { useEffect, useRef, useState } from "react"
import { IoIosArrowRoundForward } from "react-icons/io";
import { ReactTyped } from "react-typed";
import Product from "../Components/product";
import Categories from "../DummyData/categories";
import {Swiper,SwiperRef,SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css';
import { Selector, useDispatch, useSelector } from "react-redux";
import { types } from "../redux/types";
import { PiArrowSquareLeftFill , PiArrowSquareRightFill } from "react-icons/pi";
import axios from "axios";
import { TbShoppingBagPlus } from "react-icons/tb";
import { HiOutlineArrowSmRight,HiOutlineArrowSmLeft } from "react-icons/hi";
import { RiArrowDropRightLine ,RiArrowDropLeftLine} from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import SwiperCategories from "../Components/SwiperCategories";

const Home : React.FC = () =>{
    const[width, setWidth] = useState(window.innerWidth)
    const[categories, setCategories] = useState([])
    const[latestProducts, setLatestProducts] = useState([])
    const User = useSelector((state:types)=> state.reducer.data);
    const dispatch = useDispatch();
    const scrollToHeader = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperRef>(null);
    async function GetProducts(){
        const response = await axios.get("http://127.0.0.1:8000/api/products/all-products/");
    }

    async function getCategories(){
        const response = await axios.get("http://127.0.0.1:8000/api/categories/");
        setCategories(response.data)
    }

    async function getLatestProducts(){
        const response = await axios.get("http://127.0.0.1:8000/api/products/latest-products/");
        setLatestProducts(response.data)
    }

    function handleNextSlide(){
        swiperRef?.current?.swiper?.slideNext()
    }
    function handlePrevSlide(){
        swiperRef?.current?.swiper?.slidePrev()
    }
    useEffect(()=>{
        GetProducts()  
    },[])

    useEffect(()=>{
        getCategories()
    },[])
    useEffect(()=>{
        getLatestProducts()
    },[])
    
    useEffect(()=>{
        const HandleResize = () =>{
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', HandleResize)

        return ()=>{
            window.removeEventListener('resize', HandleResize)
        } 
    },[])

    return(
        <div className="container" ref={scrollToHeader}>  
            <div className="blur" style={{top:130, right:0}}></div>          
            <header className="header">
                <div className="header-text">
                    <h1>Evaluate Your<span> Tech Gadget </span>Game , In Your Life <span>.</span></h1>
                    {/* <h3>
                        Get Your <span>{" "}</span>
                        <ReactTyped strings={["Electronics","Clothes","Toys"]} typeSpeed={100} loop/>
                    </h3> */}
                    <p>Uncover the Transformative Power of Modern Technology in Your Everyday Life, and Master the Art of Integrating the Latest Gadgets to Enhance Your Productivity, Entertainment, and Overall Well-being</p>
                    <div className="header-button">
                    <div className="blur" style={{top:500, left:0}}></div>          
                        <div className="button-elements">
                            <a href="">Shop Now</a>
                            <IoIosArrowRoundForward color="#fff" size={25}/>
                        </div>
                    </div>
                </div>
                <div className="header-image">
                    <img src="images/header.png" alt="header-image" />
                </div>
            </header>

            <div className="latest categories">
                <div className="section-title">
                    <h3>Categories</h3>
                </div>
                <div className="categories-layout">
                    <Swiper
                    spaceBetween={5}
                    slidesPerView={(width < 915) ? 1 :(width < 930) ? 2: (width<1150) ? 3:4}
                    autoplay={{
                        delay: 2000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false
                       }}                    
                    >
                                            <SlideButtons/>


                    {categories && categories.map(function(item,index){
                     return(
                        <SwiperSlide key={index}>
                            <SwiperCategories item={item} index={index}/>
                        </SwiperSlide>

                     )
                    })}

                    </Swiper>
                </div>
            </div>
            <section className="latest">
                <div className="section-title">
                    <h3>Latest Products</h3>
                </div>
                <div className="products-section">
                    <div className="product-elements-layout">
                        {latestProducts && latestProducts.map(function(item,index){
                            return(
                                <React.Fragment key={index}>
                                    <Product item={item}/>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </section>

            <div className="latest trends">
                    <div className="section-title">
                        <h3 onClick={()=>window.scrollTo({
                            top:scrollToHeader?.current?.offsetTop,
                            behavior:'smooth'

                        })}>New Trends</h3>
                    </div>
                    <div className="best-selling">
                        <div className="categories-layout">
                            <div className="trends-titles">
                                    <div className="best-selling-title">
                                        <h4>Best Selling</h4>
                                    </div>
                                    <div className="arrows">
                                        <div className="trends-arrow-btns">
                                            <button onClick={handlePrevSlide} className="arrow-bg"><RiArrowDropLeftLine size={45} className="arrow-icon" color="#fff"/></button>
                                            <button onClick={handleNextSlide} className="arrow-bg"><RiArrowDropRightLine size={45} className="arrow-icon" color="#fff"/></button>
                                        </div>
                                    </div>
                            </div>
                        <Swiper
                        ref={swiperRef}
                        spaceBetween={5}
                        slidesPerView={(width < 915) ? 1 :(width < 930) ? 2: (width<1150) ? 3:4}
                        autoplay={{
                            delay: 2000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false
                        }}                    
                        >

                    {latestProducts && latestProducts.map(function(item,index){
                     return(
                        <SwiperSlide key={index}>
                            <React.Fragment>
                                <Product item={item}/> 
                            </React.Fragment>
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

function SlideButtons(){
    const Swiper = useSwiper()
    return(
        <div className="arrow-btns">
            <button onClick={()=>Swiper.slidePrev()} className="arrow-btn"><PiArrowSquareLeftFill size={45} className="arrow-icon"/></button>
            <button onClick={()=>Swiper.slideNext()} className="arrow-btn"><PiArrowSquareRightFill size={45} className="arrow-icon"/></button>
        </div>
    )
}


export default Home