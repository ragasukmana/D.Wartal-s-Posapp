const initialState = {
    dataProduct: [],
    isLoading:false,
    TotalPage:0,
    limit: 6,
    offset: 0,
}

const getProduct = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_PENDING':
            return{
                ...state,
                isLoading: true
            }
        case 'GET_PRODUCT_REJECT':
            return{
                ...state,
                isLoading: false
            }
        case 'GET_PRODUCT_SHOW':
            return {
                ...state,
                isLoading: false,
                dataProduct: action.payload
            }
        case 'GET_TOTAL_PRODUCT':
            return {
                ...state,
                isLoading: false,
                TotalPage: action.payload

            }
            default: return state
    }
}

export default getProduct