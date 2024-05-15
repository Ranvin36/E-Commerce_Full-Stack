import React from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { categoryFilterAction, searchAction } from "../redux/action"
import { useState,useContext } from "react"
import { SearchContext } from "../context/context"
import { CiFilter } from "react-icons/ci";
import  Slider  from "@mui/material/Slider"

interface FilterProp{
    type:string
}


const Filter: React.FC<FilterProp> = ({type}) =>{
    const dispatch = useDispatch();
    const ifCategory = type == "Category"
    const search = useContext(SearchContext)
    const [minprice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(999999)
    const [value,setValue] = useState([30,999])
    const [checked, setChecked] = useState({value:false , category:"null"})
    async function HandleFilter(){
        try{
            if(ifCategory){
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/filter/1/?min=${minprice}&max=${maxPrice}`)
                console.log(response)
                dispatch(categoryFilterAction(response.data))
            }
            else{
                const response = await axios.post(`http://127.0.0.1:8000/api/products/search/price/?query=${search.search}&max=${maxPrice}&min=${minprice}&category=${checked.category}`)
                dispatch(searchAction(response.data))
            }
        }
        catch(error){
            console.log("Error : "+ error)
        }
    }
    function HandleCheckBox(category:string){
        if(checked.value){
            setChecked(({value:false , category:"null"}))
            return
        }
        setChecked(({value:true , category}))
    }

    function HandleSliderChange(event : Event, newValue:number | number[] ){
        setValue(newValue as number[])
    }

    return(
        <div className="filter">
                <div className="filter-categories">
                    <h2>Categories</h2>
                    <div className="filter-check">
                        <input type="checkbox" name="" id="" onChange={()=>setChecked(({value:true , category:"Laptops"}))} style={{marginRight:5}}/>
                        <p>Laptops</p>
                    </div>
                    <div className="filter-check">
                        <input type="checkbox" name="" id="" onChange={()=>setChecked(({value:true , category:"Mobile Phones"}))} style={{marginRight:5}}/>
                        <p>Mobile Phones</p>
                    </div>
                    <div className="filter-check">
                        <input type="checkbox" name="" id="" onChange={()=>setChecked(({value:true , category:"Tablets"}))} style={{marginRight:5}}/>
                        <p>Tablets</p>
                    </div>
                </div>
                <div className="filter-numbers"> 
                    <h2>Slider</h2>

                    <div className="slider"  style={{width:180}}>                        
                        <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                max={10000}
                                onChange={HandleSliderChange}
                                valueLabelDisplay="auto"
                            />
                            <div className="slider-texts" style={{display:"flex",justifyContent:"space-between"}}>
                                <p>Min</p>
                                <p>Max</p>
                            </div>
                    </div>
                    <div className="filter-button" onClick={HandleFilter}>
                        <CiFilter color="#fff" size={23}/>
                        <input type="button" value="Filter" />
                    </div>
                </div>
            </div>
    )
}

export default Filter
