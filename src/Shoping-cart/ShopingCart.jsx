import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const ShopingCart = () => {
  return (
    <div className='Shoping-cart' style={{width:'100vw'}}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default ShopingCart
