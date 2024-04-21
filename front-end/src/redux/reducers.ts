
const initialState={
    data:null,
};

const reducer = (state = initialState , action:any) =>{
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

export default reducer