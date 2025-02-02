'use client';
import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import Link from 'next/link';
import Cards from '@/components/Cards';
const Products = ({ products }) => {
    const [isItemAdded, setIsItemAdded] = useState(false); //set the state for alert
    const [totalItemCount, setTotalItemCount] = useState(0); // set total item count
    const [prodArr, setProdArr] = useState([]); // adds the products inside the cart
    
    // Handles the item count whenever the cart button is clicked
    const incrementItemCount = async (prod) => {
        // increments the item count
        setTotalItemCount(prevCount => {
            const newCount = prevCount + 1;
            if (typeof window !== 'undefined') {
                localStorage.setItem('product_in_cart_count', newCount); //sets the product count in the cart with the updated count to display correct count
            }
            return newCount;
        }); 
        
        setIsItemAdded(true); // sets alert true
        let updatedProdArr = [...prodArr, prod]; // this array is made so as to avoid the issue where the updated state lags one step behind.
        setProdArr(updatedProdArr); // adds newly added product in array retaining the already added ones

        setTimeout(() => {
            setIsItemAdded(false); //disables the alert after 1.5s
        }, 1500);

        await addedProd(updatedProdArr);
    }

    // Function to post the added product data into the json file
    const addedProd = async (prod) => {
        try {
            const req = await fetch(`/api/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prod)
            });

            // Check if the request was successful
            if (!req.ok) {
                throw new Error(`Failed to add product. Status: ${res.status}`);
            }

        } catch (e) {
            console.error('Error adding product to cart:', e.message); // displays error message if anything happens while adding the data
        }
    }
    
    useEffect(()=>{
        // gets the product count in cart so as to display the correct number of products in the cart
        if(typeof window!=='undefined'){
            const prod_count=localStorage.getItem('product_in_cart_count');
            if(prod_count){
                setTotalItemCount(Number(prod_count));
            }
        }
    },[]);

    return (
        <>
            {/* checks whether the item added state is true and displays the alert */}
            {isItemAdded && <Alert variant='filled' className='my-2 sticky top-5 z-50'>
                <p className='text-white'>Item Added Successfully</p>
            </Alert>}

            {/* Shows the item count */}
            <div className='flex flex-col items-center'>
                <Link href='/cartspage' className=' hover:transform hover:scale-110'><button className="bg-blue-500 px-4 py-2.5 text-white"><i className="fa-solid fa-cart-shopping text-xl" aria-hidden/>&nbsp;&nbsp;{totalItemCount}</button></Link>
                <span className='mt-3 text-xl font-semibold'>Click on cart to manage products</span>
            </div>

            {/* Displays all the cards for the products inside the product array */}
                {
                    products.length>0 ? <Cards products={products} incrementItemCount={incrementItemCount} hideCartIcon={false} hideQuantityField={true} hideDeleteIcon={true} quantities={{}}/>: <div className='flex flex-col h-screen flex-wrap'>
                    <div className='my-auto flex flex-col'>
                        <span className='text-2xl font-semibold text-center'>No product available to be displayed</span>
                    </div>
                </div>
                }
                
                
        </>
    )
}

export default Products;