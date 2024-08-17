'use client';
import Cards from '@/components/Cards';
import React from 'react';

const CartsPage = async () => {

    // Capitalize the first letter
    const capitilizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
    }

    const getCartProducts = async () => {
        const res = await fetch('http://localhost:3000/api/productsincart');
        const data = await res.json();
        return data;
    }

    // Format the price
    const formatPrice = (price, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
    };

    const cartProdArr = await getCartProducts();

    return (
        <>
            <Cards products={cartProdArr} capitilizeFirstLetter={capitilizeFirstLetter} formatPrice={formatPrice}/>

            <div className="flex justify-center">
                <div className="FinalPrice p-5 bg-emerald-600 text-white rounded-lg">
                    <p className='text-lg font-semibold'>Total Amount to pay</p>
                    <p className='mt-4'>200</p>
                </div>
            </div>
        </>
    )
}

export default CartsPage;

{/* <div className='flex flex-col h-screen flex-wrap'>
                        <div className='my-auto flex flex-col'>
                            <span className='text-2xl font-semibold text-center'>No products added to the cart</span>
                            <span className='text-2xl font-semibold text-center'>Please add products to manage them</span>
                        </div>
                    </div> */}