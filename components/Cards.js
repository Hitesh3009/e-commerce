'use client';
import React from 'react'
import Image from 'next/image';
import AddToCart from '@/components/AddToCart';
const Cards = ({ products, incrementItemCount, hideCartIcon, hideQuantityField, quantities, handleQuantityChange,hideDeleteIcon ,removeProd}) => {

    // Capitalize the first letter
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
    }


    // Format the price
    const formatPrice = (price, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
    };

    return (
        <div className='flex flex-wrap justify-evenly mx-10'>
            {
                products.length > 0 ? products.map((item) => (
                    <div className='card flex flex-col border-2 border-gray-400 w-64 md:w-72 p-3 my-7' key={item.id}>

                        <div className='flex justify-between items-center my-1'>

                            {/* Displays the product ratings */}
                            <div className='flex items-center space-x-2'>
                                <i className="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                                <p>{item.rating.rate}</p>
                            </div>

                            {/* Displays the product category */}
                            <div className='bg-gray-700 p-2 rounded-xl'>
                                <p className='text-white text-sm md:text-base'>{capitalizeFirstLetter(item.category)}</p>
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
                                <p>{formatPrice(item.price)}</p>
                            </div>

                            {/* Displays the cart icon and handles the increment in item count and passes the added product info to the incrementItemCount function*/}
                            <div className={`AddToCartBtn ${hideCartIcon === true && 'hidden'}`}>
                                <AddToCart incrementItemCount={() => incrementItemCount({ id: item.id, title: item.title, image: item.image, price: item.price, rating: { rate: item.rating.rate }, category: item.category })} />
                            </div>

                            <div className={`${hideDeleteIcon === true && 'hidden'}`}>
                                <button className='text-sm font-semibold' onClick={()=>removeProd(item.id)}>Remove from cart<i className="fa-solid fa-trash text-xl px-1"></i></button>
                            </div>
                        </div>

                        <div className={`QuantityContainer ${hideQuantityField === true && 'hidden'}`} >
                            <div className='flex flex-col items-center'>
                                <label htmlFor="quantity" className='text-lg font-semibold'>Quantity</label>
                                <input type="number" aria-placeholder='Set the product quantity' className='outline-none border-2 border-black rounded-md mt-2 pl-3 py-1' value={1} onChange={(e) => handleQuantityChange(e, item.id)} min={0} />
                            </div>

                        </div>
                    </div>

                )
                ) : <div className='flex flex-col h-screen flex-wrap'>
                <div className='my-auto flex flex-col'>
                    <span className='text-2xl font-semibold text-center'>No products added to the cart</span>
                    <span className='text-2xl font-semibold text-center'>Please add products to manage them</span>
                </div>
            </div>
            }
        </div>
    )
}

export default Cards