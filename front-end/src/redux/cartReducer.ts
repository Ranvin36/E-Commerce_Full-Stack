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
            const ProductId = action.payload
            state.data = state.data.filter((state) => state.product._id !== ProductId   )
        },
        clearCart : (state) =>{
            state.data=[]
        }
    }
})

export const {cartProductsfetchSuccesful} = cartSlice.actions
export const {removeProductFromCart} = cartSlice.actions
export const {clearCart} = cartSlice.actions

export default cartSlice.reducer