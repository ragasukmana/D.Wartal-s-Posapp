const initialState = {
    isLoading:false,
    cart:[],
    order:[],
    grandTotal:0
}

const checkOut = (state = initialState, action) => {
switch (action.type) {
        case 'CHECKOUT_PENDING' :
            return{
                ...state,
                isLoading: true
            }
        case 'CHECKOUT_REJECTED' :
            return{
                ...state,
                isLoading: false
            }
        case 'CHECKOUT_FULLFILLED' :
            return{
                ...state,
                isLoading: false,
                cart: action.payload,
                order: action.payload,
                grandTotal:0

            }    
            default: return state
    }
}

export default checkOut