const initialState = {
    dataCategory: [],
    isLoading: false,
    TotalPage:0,
    limit: 6,
    offset: 0,
}

const getCategory = (state=initialState, action) => {
    switch (action.type){
        case 'GET_CATEGORY_PENDING':
        return{
            ...state,
            isLoading:true
        }
        case 'GET_CATEGORY_REJECT':
            return{
                ...state,
                isLoading: false
            }
        case 'GET_CATEGORY_ALL':
            return{
                ...state,
                isLoading: false,
                dataCategory: action.payload
            }
        case 'GET_TOTAL_CATEGORY_PAGE':
            return{
                ...state,
                isLoading: false,
                totalPage: action.payload
            }
            default: return state
    }
}

export default getCategory