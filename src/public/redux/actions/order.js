import axios from 'axios'

export const requestOrder = (body) => {
    return{
        type: "SELECT_ORDER",
        payload: axios.get()
    }
}