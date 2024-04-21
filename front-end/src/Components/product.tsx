import React from "react"
import { TbShoppingBagPlus } from "react-icons/tb";
const Product : React.FC = () =>{
    return(
        <div className="product-layout">
            <div className="product-image">
                <img src="images/product1.png" alt="" />
            </div>
            <div className="product-details">
                <h3>DJI Action 2 Camera Power Combo Bundle</h3>
                <p>$1100</p>
            </div>
            <div className="product-cart">
                <TbShoppingBagPlus  size={23} className="product-cart-icon"/>
            </div>
        </div>
    )
}

export default Product
