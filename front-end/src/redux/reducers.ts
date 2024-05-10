
const initialState={
    data:[],
};

export const reducer = (state = initialState , action:any) =>{
    switch(action.type){
        case 'FETCH_DATA_SUCCESS' :
            return{
                ...state,
                data: action.payload
            }
        default :
            return state
    }
}


export const searchReducer = (state = initialState, action:any) =>{
    switch(action.type){
        case 'PRODUCT_SEARCH_SUCCESSFUL':
            return {...state, data:action.payload}

        default :
            return state
    }
}
export const cartReducer = (state = initialState, action:any) =>{
    switch(action.type){
        case 'CART_PRODUCTS_FETCH_SUCCESSFUL':
            const newArray = Array.isArray(action.payload) ? action.payload : [action.payload]
            return {...state, data:newArray}

        default :
            return state
    }
}