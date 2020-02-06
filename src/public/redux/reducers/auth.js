const initialState = {
    data:[],
    isLoading: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_LOGIN_PENDING':
            return{
                ...state,
                isLoading: true
            }
        case 'POST_LOGIN_REJECT':
            return{
                ...state,
                isLoading: false
            }
        case 'POST_LOGIN_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload
            }
        default: return state
    }
}

export default auth