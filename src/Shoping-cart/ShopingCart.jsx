import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const ShopingCart = () => {
  return (
    <div className='Shoping-cart'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default ShopingCart
