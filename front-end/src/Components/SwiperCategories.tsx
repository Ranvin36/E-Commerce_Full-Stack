import React from "react"
import { useNavigate } from "react-router-dom"
import { SwiperSlide } from "swiper/react"

interface SwiperItems{
    _id:number,
    image:string,
    name:string
}


interface SwiperProps{
    index:number,
    item:SwiperItems
}


const SwiperCategories : React.FC<SwiperProps>= ({item,index}) =>{
    const Navigate = useNavigate()
    function ViewCategory(id:number){
        Navigate(`Category/${id}`)
    }
    return(
        <div className="swiper-container" onClick={()=>ViewCategory(item._id)}>
                <div className="product-categories-layout">
                    <div className="product-image">
                        <img src={`http://127.0.0.1:8000${item.image}`} alt="" />
                    </div>
                    <div className="product-title">
                        <h3>{item.name}</h3>
                    </div>
                </div>
        </div>
    )
}


export default SwiperCategories