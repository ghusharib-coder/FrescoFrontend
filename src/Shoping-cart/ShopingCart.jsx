import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const ShopingCart = () => {
  return (
    <div className='Shoping-cart'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default ShopingCart
