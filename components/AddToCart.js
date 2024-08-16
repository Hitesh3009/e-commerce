'use client'
import React, { useState } from 'react'

const AddToCart = ({ incrementItemCount, addedProd }) => {
    const [message,setMessage] = useState('');

    const handleItemCount = () => {
        incrementItemCount();
        setMessage('Product added to the cart you can manage other things there.');
    }
    
    return (
        <>  
        <div>
            <button onClick={handleItemCount} className={`${message?'hidden':''}`}><i className={`fa-solid fa-cart-shopping text-2xl`} /></button>
            <p className='text-[0.9rem] font-semibold mx-5 text-justify text-green-600'>{message?message:''}</p>
        </div>
        </>
    )
}

export default AddToCart;
