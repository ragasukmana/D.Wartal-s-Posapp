import axios from 'axios'

export const requestUser = (body) => {
    return{
        type: "GET_USER",
        payload: axios.get(`${process.env.REACT_APP_HOST}/user/`)
    }
       
}