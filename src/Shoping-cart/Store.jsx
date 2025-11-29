import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import homeReducer from './HomeSlice'
import cartReducer from './cartSlice'

const Store=configureStore({
    reducer:{
       home:homeReducer,
       cart:cartReducer,
    },
})

export default Store
