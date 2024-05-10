import axios from "axios"
import { Dispatch } from "redux"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const action = (data : any) =>(
    {
    type:'FETCH_DATA_SUCCESS',
    payload:data
})

export const searchAction = (data:any) =>(
    {
    type:'PRODUCT_SEARCH_SUCCESSFUL',
    payload:data
})

export const cartProducts = (data:any) =>(
    {
    type:'CART_PRODUCTS_FETCH_SUCCESSFUL',
    payload:data
})

// export const products = (data:any) =>({
//     type:'FETCH_PRODUCTS_SUCCESS',
//     paylaod:data
// })

// export const FetchProducts = () => async(dispatch :Dispatch) =>{
//     dispatch({type:'FETCH_PRODUCTS_SUCCESS'})
//     try{
//         const response = await axios.get('http://127.0.0.1:8000/api/all-product')
//         dispatch(products(response.data))
//     }
//     catch{
//         console.log("error")
//     }
// }

