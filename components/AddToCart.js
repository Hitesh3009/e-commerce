'use client';
import React, { useState } from 'react';

const AddToCart = ({ incrementItemCount }) => {
    const handleItemCount = () => {
        incrementItemCount();
    }
    return (
        <>
            <div>
                <button onClick={handleItemCount}><i className="fa-solid fa-cart-shopping text-2xl" /></button>
            </div>
        </>
    )
}

export default AddToCart