import React from "react"
import Brands from "../DummyData/brands"
import Filter from "../Components/Filter"
import Product from "../Components/product"
const Category : React.FC = () =>{
    return(
        <div className="categories-container">
            <div className="categories-layout">
                <div className="results-found">
                    <h3>200 Products Found For "Laptops"</h3>
                </div>
                <div className="product-brand">
                    {Brands && Brands.map(function(item,index:number){
                        return(
                            <div className="brand-container">
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
                <Filter/>
                <div style={{display:"flex"}}>
                    <Product/>
                    <Product/>
                    <Product/>
                </div>
            </div>
        </div>
    )
}

export default Category