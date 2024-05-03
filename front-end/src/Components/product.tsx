import React from "react"
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
    function ViewProduct(id:number){
        navigate(`/product/${id}`)
    }
    return(
        <div className="product-layout" onClick={()=>ViewProduct(item._id)}>
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
            <div className="product-cart">
                <TbShoppingBagPlus  size={23} className="product-cart-icon"/>
            </div>
        </div>
    )
}

export default Product
