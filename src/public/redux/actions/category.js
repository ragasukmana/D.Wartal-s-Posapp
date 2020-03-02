import axios from 'axios'

export const requestCategory = (body) => {
    return{
        type: "GET_CATEGORY",
        payload: axios.get(`${process.env.REACT_APP_HOST}/category/`)
    }
       
}