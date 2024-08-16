'use client'
import React, { useState } from 'react'

const AddToCart = ({ incrementItemCount }) => {
    const [message, setMessage] = useState(''); // state tp display the message after the cart icon is clicked

    const handleItemCount = () => {
        incrementItemCount();// increment item count
        setMessage('Product added to the cart you can manage other things there.'); // set the message after the cart icon is clicked
    }

    return (
        <>
            <div>

                {/* Displays the message only when the cart icon is clicked and hides the cart icon for that product*/}
                <button onClick={handleItemCount} className={`${message ? 'hidden' : ''}`}><i className={`fa-solid fa-cart-shopping text-2xl`} /></button>
                <p className='text-[0.9rem] font-semibold mx-5 text-justify text-green-600'>{message ? message : ''}</p>

            </div>
        </>
    )
}

export default AddToCart;
