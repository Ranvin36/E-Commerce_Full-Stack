import React from "react"
import { SwiperSlide } from "swiper/react"

interface SwiperItems{
    id:number,
    image:string,
    title:string
}


interface SwiperProps{
    index:number,
    item:SwiperItems
}


const SwiperCategories : React.FC<SwiperProps>= ({item,index}) =>{
    return(
        <div className="swiper-container">
                <div className="product-categories-layout">
                    <div className="product-image">
                        <img src={item.image} alt="" />
                    </div>
                    <h3>{item.title}</h3>
                </div>
        </div>
    )
}


export default SwiperCategories