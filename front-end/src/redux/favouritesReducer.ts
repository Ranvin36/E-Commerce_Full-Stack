import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface favouritesState{
    data:any[]
}

const initialState:favouritesState = {
    data:[]
}


const favouritesSlice = createSlice({
    name:"favourites",
    initialState,
    reducers:{
        fetchFavouriteProducts : (state, action:PayloadAction<any[]>) =>{
            state.data = [...state.data,...action.payload]
        },
        removeFavouritesProduct : (state, action:PayloadAction<number>) =>{
            const ProductId = action.payload
            state.data = state.data.filter((item) => item.product._id !== ProductId)
        },
        clearFavourites : (state) =>{
            state.data=[]
        }
    }
})


export const {fetchFavouriteProducts} = favouritesSlice.actions
export const {removeFavouritesProduct} = favouritesSlice.actions
export const {clearFavourites} = favouritesSlice.actions

export default favouritesSlice.reducer