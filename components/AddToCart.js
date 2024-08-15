'use client'
import React, { useState } from 'react'

const AddToCart = ({incrementItemCount,addedProd}) => {
    const [prodArr,setProdArr]=useState([]);

    const handleItemCount=async()=>{
        incrementItemCount();
        
        const updateProductDetails={
            title:addedProd.title,
            image:addedProd.image,
            price:addedProd.price
        }

        const updateProdArr=[...prodArr,updateProductDetails];
        setProdArr(updateProdArr);
        await addedProducts(updateProdArr);
    }

    const addedProducts=async(products)=>{
        try {
            const res=await fetch('/api/cart',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(products)
            });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <button onClick={handleItemCount}><i className="fa-solid fa-cart-shopping text-2xl" /></button>
        </div>
    )
}

export default AddToCart