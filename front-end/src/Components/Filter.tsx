import React from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { categoryFilterAction, searchAction } from "../redux/action"
import { useState,useContext } from "react"
import { SearchContext } from "../context/context"
import { CiFilter } from "react-icons/ci";

interface FilterProp{
    type:string
}


const Filter: React.FC<FilterProp> = ({type}) =>{
    const dispatch = useDispatch();
    const ifCategory = type == "Category"
    const search = useContext(SearchContext)
    const [minprice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    async function HandleFilter(){
        try{
            if(ifCategory){
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/filter/1/?min=${minprice}&max=${maxPrice}`)
                console.log(response)
                dispatch(categoryFilterAction(response.data))
            }
            else{
                const response = await axios.post(`http://127.0.0.1:8000/api/products/search/price/?query=${search.search}&max=${maxPrice}&min=${minprice}`)
                dispatch(searchAction(response.data))
            }
        }
        catch(error){
            console.log("Error : "+ error)
        }
    }
    return(
        <div className="filter">
                <div className="filter-input">
                    <input type="number" placeholder="Min" onChange={(e)=> setMinPrice(e.target.value)} />
                </div>
                <div className="filter-input">
                    <input type="number" placeholder="Max" onChange={(e)=>setMaxPrice(e.target.value)}/>
                </div>
                <div className="filter-button" onClick={HandleFilter}>
                    <CiFilter color="#fff" size={23}/>
                    <input type="button" value="Filter" />
                </div>
            </div>
    )
}

export default Filter
