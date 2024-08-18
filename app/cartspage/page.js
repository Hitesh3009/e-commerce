'use client';
import Cards from '@/components/Cards';
import { Alert } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from '../loading';

const CartsPage = () => {
    const [quantities, setQuantities] = useState({}); // stores the quantity of the product with respect to their id
    const [cartProdArr, setCartProdArr] = useState([]); // stores the products in cart
    const [isProdRemove, setProdRemove] = useState(false); // alert state for the removal of products

    const handleQuantityChange = (e, prod_id) => {
        const newQuantity = e.target.value; // set the new quantity entered by the user

        // retains the quantities for other products and changes for the specific product
        setQuantities({
            ...quantities,
            [prod_id]: newQuantity >= 0 ? newQuantity : 0 // handles negative quantity value
        });
    }

    // Format the price
    const formatPrice = (price, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
    };

    // function to remove product from cart
    const removeProd = async (id) => {
        try {
            // fetches the delete request
            const res = await fetch(`/api/removefromcart/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: cartProdArr }) // passes the product body
            });
            if (!res.ok) {
                throw new Error('Network response was not ok'); // throws error for any issue while fetching
            }
            else {
                localStorage.setItem('product_in_cart_count', cartProdArr.length - 1); //updates the count of the products after deletion
                setCartProdArr(cartProdArr.filter(product => product.id !== id)); // filters out the products so the removed product should not be visible on UI
                setProdRemove(true); //sets the removal alert true
                setTimeout(() => {
                    setProdRemove(false); // disables the alert after 1.5s
                }, 1500);
            }
        } catch (e) {
            console.error(e.message); // logs error message
        }
    }

    // calculates the total amount to be paid
    const totalPrice = () => {
        let sum = 0;
        for (let i = 0; i < cartProdArr.length; i++) {
            const product = cartProdArr[i]; // gets the individual product in cart
            const quantity = quantities[product.id] || 1; // gets their quantity
            sum += product.price * quantity; // final amount
        }
        return sum;
    }

    // fetches the products in the cart
    const getCartProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/productsincart');
            if (!res.ok) {
                throw new Error('Error fetching cart products', res.statusText); // throws error for any issue while fetching
            }
            const data = await res.json();

            const initialQuantity = {}; // used to maitain the product quantity with respect to their id
            data.forEach(ele => {
                initialQuantity[ele.id] = quantities[ele.id] || 1;
            });
            setCartProdArr(data); // updates the array state
            setQuantities(initialQuantity); // updates the quantity state
        } catch (e) {
            console.error(e.message); // logs the error message
        }
    }

    useEffect(() => {
        getCartProducts(); // renders the products after the successful mount of component
    }, []);

    return (
        <Suspense fallback={<Loading/>}>
            <div>
                {/* checks whether the product is removed and shows the alert accordingly */}
                {
                    isProdRemove && <div className="flex justify-center my-2 sticky top-5 z-50" >
                        <Alert variant='filled' severity='success' className='w-72'>
                            <p>Item removed Successfully</p>
                        </Alert>
                    </div>
                }

                {/* checks if the cart is empty and if products are present it displays them using the reusable component cards and if empty then shows message that cart is empty */}
                {
                    cartProdArr.length > 0 ? <Cards products={cartProdArr} hideCartIcon={true} hidequantitiesField={false} quantities={quantities} handleQuantityChange={handleQuantityChange} hideDeleteIcon={false} removeProd={removeProd} /> : <div className='flex flex-col h-screen flex-wrap'>
                        <div className='my-auto flex flex-col'>
                            <span className='text-2xl font-semibold text-center'>No products added to the cart</span>
                            <span className='text-2xl font-semibold text-center'>Please add products to manage them</span>
                        </div>
                    </div>
                }

                {/* Hides this part if cart is empty and if not then shows the total amount to be paid by the customer */}
                <div className={`flex justify-center ${cartProdArr.length === 0 && 'hidden'} mb-5`}>
                    <div className="FinalPrice p-5 bg-emerald-600 text-white rounded-lg">
                        <p className='text-lg font-semibold'>Total Amount to pay</p>
                        <p>{formatPrice(totalPrice())}</p>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default CartsPage;
