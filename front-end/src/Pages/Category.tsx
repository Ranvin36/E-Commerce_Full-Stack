import React, { useEffect } from "react"
import { useState } from "react"
import Brands from "../DummyData/brands"
import Filter from "../Components/Filter"
import Product from "../Components/product"
import axios from "axios"
import { useParams } from "react-router-dom"
const Category : React.FC = () =>{
    const {id} = useParams();
    const [productCategories , setProductCategories] = useState([])
    async function FetchCategories(){
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/categories/products/${id}`)
            setProductCategories(response.data)
        }
        catch(error:any){
            console.log(error.response.data.Message)
        }
    }
    useEffect(()=>{
        FetchCategories()
    },[setProductCategories])
    return(
        <div className="categories-container">
            <div className="categories-layout">
                <div className="results-found">
                    <h3>200 Products Found For "Laptops"</h3>
                </div>
                <div className="product-brand">
                    {Brands && Brands.map(function(item,index:number){
                        return(
                            <div className="brand-container" key={index}>
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
                <Filter type="Category"/>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                   {productCategories && productCategories.map(function(item,index){
                    return(
                        <React.Fragment>
                            <Product item={item}/>
                        </React.Fragment>
                    )
                   })}
                </div>
            </div>
        </div>
    )
}

export default Category