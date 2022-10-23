import React from 'react'
import empty from '../../assets/image/empty-2.JPG'

function Emptylist({message}) {
  return (
    <div className='d-flex flex-column align-items-center text-center'>
        <img className='img-fluid w-50 h-50' src={empty} alt="empty list" />
        <h5>{message}</h5>
    </div>
  )
}

export default Emptylist