'use client';
import Cards from '@/components/Cards';
import React, { useEffect, useState } from 'react';

const CartsPage = () => {
    const [quantities, setQuantities] = useState({});
    const [cartProdArr, setCartProdArr] = useState([]);

    const handleQuantityChange = (e,prod_id) => {
        const newQuantity = e.target.value;
        setQuantities({
            ...quantities,
            [prod_id]:newQuantity>=0?newQuantity:0
        });
    }

    // Format the price
    const formatPrice = (price, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
    };

    const totalPrice = () => {
        let sum = 0;
        for (let i = 0; i < cartProdArr.length; i++) {
            const price = cartProdArr[i].price;
            const prod_id = cartProdArr[i].id;
            sum += price * quantities[prod_id];
        }
        return sum;
    }
    const getCartProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/productsincart');
            if (!res.ok) {
                throw new Error('Error fetching cart products', res.statusText);
            }
            const data = await res.json();
            setCartProdArr(data);
            const initialQuantity = {};
            data.forEach(ele=>{
                initialQuantity[ele.id]=1;
            });
            setQuantities(initialQuantity);
        } catch (e) {
            console.error(e.message);
        }
    }


    useEffect(() => {
        getCartProducts();
    }, []);

    return (
        <div>

            {
                cartProdArr ? <Cards products={cartProdArr} hideCartIcon={true} hideQuantityField={false} quantities={quantities} handleQuantityChange={handleQuantityChange} /> : <div className='flex flex-col h-screen flex-wrap'>
                    <div className='my-auto flex flex-col'>
                        <span className='text-2xl font-semibold text-center'>No products added to the cart</span>
                        <span className='text-2xl font-semibold text-center'>Please add products to manage them</span>
                    </div>
                </div>
            }

            <div className="flex justify-center">
                <div className="FinalPrice p-5 bg-emerald-600 text-white rounded-lg">
                    <p className='text-lg font-semibold'>Total Amount to pay</p>
                    <p>{formatPrice(totalPrice())}</p>
                </div>
            </div>
        </div>

    )
}

export default CartsPage;
