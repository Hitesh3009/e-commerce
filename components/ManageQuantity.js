import React from 'react'

const ManageQuantity = ({quantity,handleQuantityChange}) => {
    const h=()=>{
        handleQuantityChange();
    }
  return (
    <div>
        <input type="number" aria-placeholder='Set the product quantity' className='outline-none border-2 border-black rounded-md mt-2 pl-3 py-1' value={quantity} onChange={h} min={0}/>
    </div>
  )
}

export default ManageQuantity