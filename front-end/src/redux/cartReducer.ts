import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface cartState{
    data: any[]
}

const initialState :cartState = {
    data:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        cartProductsfetchSuccesful : (state, action:PayloadAction<any[]>)=>{
            state.data = [...state.data, ...action.payload]
        },
        removeProductFromCart: (state, action:PayloadAction<number>)=>{
            const productId = action.payload

            state.data = state.data.filter((state) => state._id !== productId)
            console.log("REMOVED")
        }
    }
})

export const {cartProductsfetchSuccesful} = cartSlice.actions
export const {removeProductFromCart} = cartSlice.actions

export default cartSlice.reducer