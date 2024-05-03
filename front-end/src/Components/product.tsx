import React from "react"
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
const Product : React.FC = () =>{
    return(
        <div className="product-layout">
            <div className="product-image">
                <img src="http://localhost:8000/images/product1_V22wsvD.png" alt="" />
            </div>
            <div className="product-details">
                <h3>DJI Action 2 Camera Power Combo Bundle</h3>
                <div className="rating-sold">
                    <FaStar color="#eff781"/>
                    <p>4.7</p>
                    <div className="line"></div>
                    <p>45 Sold</p>
                </div>
                <p>$1100</p>
            </div>
            <div className="product-cart">
                <TbShoppingBagPlus  size={23} className="product-cart-icon"/>
            </div>
        </div>
    )
}

export default Product
