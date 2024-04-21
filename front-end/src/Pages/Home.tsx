import React from "react"
import { IoIosArrowRoundForward } from "react-icons/io";
import { ReactTyped } from "react-typed";
import Product from "../Components/product";
import Categories from "../DummyData/categories";
import {Swiper,SwiperSlide} from "swiper/react";
import AutoPlay from "swiper"
import 'swiper/css';
import { Selector, useSelector } from "react-redux";
import { types } from "../redux/types";
const Home : React.FC = () =>{
    const User = useSelector((state:types)=> state.reducer.data)
    console.log(User)
    return(
        <div className="container">            
            <header className="header">
                <div className="header-text">
                    <h1>Evaluate Your<span> Tech Gadget </span>Game , In Your Life <span>.</span></h1>
                    {/* <h3>
                        Get Your <span>{" "}</span>
                        <ReactTyped strings={["Electronics","Clothes","Toys"]} typeSpeed={100} loop/>
                    </h3> */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    <div className="header-button">
                        <div className="button-elements">
                            <a href="">Shop Now</a>
                            <IoIosArrowRoundForward color="#fff" size={25}/>
                        </div>
                    </div>
                </div>
                <div className="header-image">
                    <img src="images/header.png" alt="" />
                </div>
            </header>

            <div className="latest categories">
                <div className="section-title">
                    <h3>Categories</h3>
                </div>
                <div className="categories-layout">
                    <Swiper
                    loop={true}
                    spaceBetween={5}
                    slidesPerView={4}
                    autoplay={{
                        delay: 2000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false
                       }}                    
                    >

                    {Categories && Categories.map(function(item,index){
                     return(
                        <SwiperSlide key={index} className="swiper">
                            <div className="product-categories-layout">
                                <div className="product-image">
                                    <img src={item.image} alt="" />
                                </div>
                                <h3>{item.title}</h3>
                            </div>
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
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                </div>
            </section>

        </div>
    )

}

export default Home