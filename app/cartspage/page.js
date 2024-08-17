'use client';
import Cards from '@/components/Cards';
import React, { useEffect, useState } from 'react';

const CartsPage = () => {
    const [quantity,setQuantity]=useState(1);
    const [cartProdArr,setCartProdArr]=useState([]);

    // Capitalize the first letter
    const capitilizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
    }

    const handleQuantityChange=(e)=>{
        setQuantity(e.target.value);
    }

    const getCartProducts = async () => {
        try {         
            const res = await fetch('http://localhost:3000/api/productsincart');
            if(!res.ok){
                throw new Error('Error fetching cart products',res.statusText);
            }
            const data = await res.json();
            setCartProdArr(data);
        } catch (e) {
            console.error(e.message);
        }
    }

    // Format the price
    const formatPrice = (price, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
    };

    useEffect(()=>{
        getCartProducts();
    },[]);
    
    return (
        <div>

            {
                cartProdArr? <Cards products={cartProdArr} capitilizeFirstLetter={capitilizeFirstLetter} formatPrice={formatPrice} hideCartIcon={true} hideQuantityField={false} quantity={quantity} handleQuantityChange={handleQuantityChange}/> : <div className='flex flex-col h-screen flex-wrap'>
                    <div className='my-auto flex flex-col'>
                        <span className='text-2xl font-semibold text-center'>No products added to the cart</span>
                        <span className='text-2xl font-semibold text-center'>Please add products to manage them</span>
                    </div>
                </div>
            }

            <div className="flex justify-center">
                <div className="FinalPrice p-5 bg-emerald-600 text-white rounded-lg">
                    <p className='text-lg font-semibold'>Total Amount to pay</p>
                    <p className='mt-4'>200</p>
                </div>
            </div>
        </div>

    )
}

export default CartsPage;
