import axios from 'axios'

export const requestProduct = (body) => {
    return{
        type: "GET_PRODUCT",
        payload: axios.get(`${process.env.REACT_APP_HOST}/products?limit=${this.state.limit}&offset=${this.state.offset}&category=${this.state.category}`)
    },
    {
        type: "ON_SEARCH",
        payload: axios.get(`${process.env.REACT_APP_HOST}/products?name_product=${this.state.name}&limit=${this.state.limit}&offset=${this.state.offset}&sortby=${this.state.sortby}&category=${this.state.category}`)
    }
       
}