import React from 'react'

export const AddPopup = () => {
  return (
    <div className='pop-up'>
      <h2 style={{ fontSize: '1.5rem', margin: '0', textAlign: 'center' }}>✅ Item added to cart!</h2>
      <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7 }}>🎉 Continue shopping!</p>
    </div>
  )
}
export const RemovePopup = () => {
  return (
    <div className='pop-up'>
      <h2 style={{ fontSize: '1.5rem', margin: '0', textAlign: 'center' }}>🗑️ Item removed from cart!</h2>
      <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7 }}>Your cart has been updated</p>
    </div>
  )
}
export const DuplicatePopup = () => {
  return (
    <div className='pop-up'>
      <h2 style={{ fontSize: '1.5rem', margin: '0', textAlign: 'center' }}>⚠️ Item already in cart!</h2>
      <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7 }}>This item is already in your cart</p>
    </div>
  )
}
export const MessagePopup = () => {
  return (
    <div className='pop-up'>
      <h2 style={{ fontSize: '1.5rem', margin: '0', textAlign: 'center' }}>📧 Message Delivered!</h2>
      <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7 }}>We'll respond soon!</p>
    </div>
  )
}
