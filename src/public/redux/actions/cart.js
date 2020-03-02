import axios from 'axios'

export const requestCart = (body) => {
    return{
        type: "CHECK_OUT_PRODUCT",
        payload: axios.post(`${process.env.REACT_APP_HOST}/order/`, body)
    }
}