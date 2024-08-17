import React from 'react'
import Image from 'next/image';
import AddToCart from '@/components/AddToCart';
const Cards = ({ products, capitilizeFirstLetter, formatPrice, incrementItemCount, hideCartIcon }) => {
    let quantity = 1;
    return (
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
                                <p>{formatPrice(item.price)}</p>
                            </div>

                            {/* Displays the cart icon and handles the increment in item count and passes the added product info to the incrementItemCount function*/}
                            <div className={`AddToCartBtn ${hideCartIcon === true && 'hidden'}`}>
                                <AddToCart incrementItemCount={() => incrementItemCount({ title: item.title, image: item.image, price: item.price, rating: item.rating.rate, category: item.category, quantity: quantity })} />
                            </div>
                        </div>
                    </div>

                )
                )
            }
        </div>
    )
}

export default Cards