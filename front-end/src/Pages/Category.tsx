import React from "react"
import Brands from "../DummyData/brands"
import Filter from "../Components/Filter"
import Product from "../Components/product"
<<<<<<< HEAD
import axios from "axios"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { types } from "../redux/types"
import { categoryFilterAction } from "../redux/action"

interface Product{
    _id:number,
    name:string,
    image:string,
    price:number
}

const Category : React.FC = () =>{
    const {id} = useParams();
    const dispatch = useDispatch();
    async function FetchCategories(){
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/categories/products/${id}`)
            dispatch(categoryFilterAction(response.data))
        }
        catch(error:any){
            console.log(error.response.data.Message)
        }
    }
    useEffect(()=>{
        FetchCategories()
    },[])
    const productCategories = useSelector((selector:types) => selector.categoryFilterReducer.data)
    console.log(productCategories.category)
=======
const Category : React.FC = () =>{
>>>>>>> parent of 195ba23 (Dynamic Data +Categories Filter(Server) ))
    return(
        <div className="categories-container">
            <div className="categories-layout">
                <div className="results-found">
                    <h3>{productCategories.length} Products Found For "ABCD"</h3>
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
<<<<<<< HEAD
                <Filter type="Category"/>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                   {productCategories && productCategories.map(function(item:Product,index:number){
                    return(
                        <React.Fragment>
                            <Product item={item}/>
                        </React.Fragment>
                    )
                   })}
=======
                <Filter/>
                <div style={{display:"flex"}}>
                    <Product/>
                    <Product/>
                    <Product/>
>>>>>>> parent of 195ba23 (Dynamic Data +Categories Filter(Server) ))
                </div>
            </div>
        </div>
    )
}

export default Category