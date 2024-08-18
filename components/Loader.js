import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
            <div className='flex items-center h-screen justify-center'>
                <div className='flex items-center justify-center bg-black px-3 rounded-2xl my-auto'>
                    <div className='w-20 h-20 relative'>
                        <Image src='/loading.gif' fill sizes='auto' alt='Loading'/> {/*loader gif to be displayed while loading */}
                    </div>  
                <p className='text-xl text-white'>Loading data</p>
                </div>
            </div>
    )
}

export default Loader