import React from 'react'

const TransactionViewer = ({ transact }) => {



    const { id, title, category, sold, dateOfSale, price, image, description } = transact
    return (
        <div className='flex flex-col justify-start my-4 border shadow-lg p-2 rounded-md'>


            <section className='flex justify-around '>
                <section className=' w-4/12'>
                    <h1><span className='font-semibold text-sm mr-2'>ID :</span> {id}</h1>
                    <p> <span className='font-semibold text-sm mr-2'>Title :</span> {title}</p>
                    <p> <span className='font-semibold text-sm mr-2'>Sold :</span> {sold ? "Out Of Stock" : "In Stock"}</p>

                </section>
                <section className=' w-4/12'>
                    <p><span className='font-semibold text-sm mr-2'>Category:</span>{category}</p>
                    <p><span className='font-semibold text-sm mr-2'>Price:</span>{price} Rs</p>
                    <p><span className='font-semibold text-sm mr-2'>SaleData:</span> {dateOfSale}</p>
                </section>
                <section className='flex justify-end'>
                    <img className='w-28 h-36' src={image} alt={title} />
                </section>
            </section>
            <p className='text-justify px-12' ><span className='text-lg font-semibold'>Description </span>: {description}</p>


        </div>
    )
}

export default TransactionViewer