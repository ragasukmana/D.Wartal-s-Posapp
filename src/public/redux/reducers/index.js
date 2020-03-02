import {combineReducers} from 'redux'

import auth from './auth'
import getProduct from './product'
import checkOut from './cart'
import getCategory from './category'
import getUser from './user'


export default combineReducers ({
        auth,
        getProduct,
        checkOut,
        getCategory,
        getUser
})