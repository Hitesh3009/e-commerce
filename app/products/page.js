'use client';

import React, { useState } from 'react';
import AddToCart from '@/components/AddToCart';
import Image from 'next/image';
import { Alert } from '@mui/material';

const Products = ({ products }) => {
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [isItemAdded, setIsItemAdded] = useState(false);
    const incrementItemCount = () => {
        setTotalItemCount(prevCount => prevCount + 1);
        setIsItemAdded(true);

        setTimeout(() => {
            setIsItemAdded(false);
        }, 1500);
    }
    return (
        <>
            {isItemAdded && <Alert variant='filled' className='my-2 sticky top-5 z-50'>
                <p className='text-white'>Item Added Successfully</p>
            </Alert>}
            <span className="bg-blue-500 px-4 py-2 text-white"><i className="fa-solid fa-cart-shopping text-xl" />&nbsp;&nbsp;{totalItemCount}</span>
            <div className='flex flex-wrap justify-evenly mx-10'>
                {
                    products.map((item) => (
                        <div className='card flex flex-col border-2 border-gray-400 w-64 h-auto md:w-72 md:min-h-[19rem] p-3 my-7' key={item.id}>
                            <div className='Imagecontainer flex justify-center items-center  h-40 w-full rounded-full'>
                                <div className='productImage w-32 h-32 relative'>
                                    <Image src={item.image} fill sizes='auto' alt='Product Image' priority={true} />
                                </div>
                            </div>
                            <div className='ProductNameContainer  mt-3 flex flex-col items-center'>
                                <div className='flex-grow'>
                                    <p className='text-justify p-2 text-[0.9rem] font-semibold'>{item.title}</p>
                                </div>
                            </div>
                            <div className='flex justify-between p-2 mt-auto'>
                                <div className='ProductPrice'>
                                    <p>{item.price}</p>
                                </div>
                                <div className='AddToCartBtn'>
                                    <AddToCart incrementItemCount={incrementItemCount} />
                                </div>
                            </div>
                        </div>

                    )
                    )
                }
            </div>
        </>
    )
}

export default Products;