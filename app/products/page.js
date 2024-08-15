'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AddToCart from '@/components/AddToCart';
import { Alert } from '@mui/material';

const Products = ({products}) => {
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [isItemAdded,setIsItemAdded] = useState(false);

    const capitilizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
    }

  // Handles the item count whenever the cart button is clicked
    const incrementItemCount = ()=>{
        setTotalItemCount(prevCount=>prevCount + 1);
        setIsItemAdded(true); // sets alert true

        setTimeout(() => {
        setIsItemAdded(false); //disables the alert after 1.5s
        }, 1500);
    }

    return (
        <>
            {/* checks whether the item added state is true and displays the alert */}
            {isItemAdded && <Alert variant='filled' className='my-2 sticky top-5 z-50'>
                <p className='text-white'>Item Added Successfully</p>
            </Alert>}

            {/* Shows the item count */}
            <span className="bg-blue-500 px-4 py-2 text-white"><i className="fa-solid fa-cart-shopping text-xl" />&nbsp;&nbsp;{totalItemCount}</span>

            {/* Displays all the cards for the products inside the product array */}
            <div className='flex flex-wrap justify-evenly mx-10'>
                {
                    products.map((item) => (
                        <div className='card flex flex-col border-2 border-gray-400 w-64 md:w-72 p-3 my-7' key={item.id}>


                            <div className='flex justify-between items-center my-1'>

                                {/* Displays the product ratings */}
                                <div className='flex items-center space-x-2'>
                                    <i className="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                                    <p>{item.rating.rate}</p>
                                </div>

                                {/* Displays the product category */}
                                <div className='bg-gray-700 p-2 rounded-xl'>
                                    <p className='text-white text-sm md:text-base'>{capitilizeFirstLetter(item.category)}</p>
                                </div>

                            </div>

                            {/* Shows the image */}
                            <div className='Imagecontainer flex justify-center items-center  h-40 w-full rounded-full'>
                                <div className='productImage w-32 h-32 relative'>
                                    <Image src={item.image} fill sizes='auto' alt='Product Image' priority={true} />
                                </div>
                            </div>

                            {/* Displays the product title */}
                            <div className='ProductNameContainer  mt-3 flex flex-col items-center'>
                                <div className='flex-grow'>
                                    <p className='text-justify p-2 text-[0.9rem] font-semibold'>{item.title}</p>
                                </div>
                            </div>

                            {/* Displays the product price */}
                            <div className='flex justify-between p-2 mt-auto'>
                                <div className='ProductPrice'>
                                    <p>{item.price}</p>
                                </div>
                                {/* Displays the cart icon and handles the increment in item count */}
                                <div className='AddToCartBtn'>
                                    <AddToCart incrementItemCount={incrementItemCount} addedProd={item}/>
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