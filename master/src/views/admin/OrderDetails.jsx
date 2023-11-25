import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
const OrderDetails = () => {

    const { orderId } = useParams()
    const dispatch = useDispatch()

    // const { errorMessage, successMessage } = useSelector(state => state.order)

    useEffect(() => {
    }, [])

    const [status, setStatus] = useState('')
    useEffect(() => {
    }, [])
    const status_update = (e) => {
    }

    useEffect(() => {
        // if (successMessage) {
        //     toast.success(successMessage)
        // }
        // if (errorMessage) {
        //     toast.error(errorMessage)
        // }
    }, [])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-black rounded-md'>
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl text-[#d0d2d6]'>Order Details</h2>
                    <select onChange={status_update} value={status} name="" id="" className='px-4 py-2 focus:border-indigo-500 outline-none bg-slate-700 border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="warehouse">warehouse</option>
                        <option value="placed">placed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex gap-2 text-lg text-[#d0d2d6]'>
                        <h2>#8598756807</h2>
                        <span>20-12-2023</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3 text-[#d0d2d6] text-lg'>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='pb-2 font-semibold'>Deliver to : Michigan</h2>
                                    <p><span className='text-sm'>$1500</span></p>
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <h2>Payment Status : </h2>
                                    <span className='text-base'>Paid</span>
                                </div>
                                <span>Price : $1500</span>
                                <div className='mt-4 flex flex-col gap-8'>
                                    <div className='text-[#d0d2d6]'>
                                        <div key={''} className='flex gap-3 text-md'>
                                                <img className='w-[45px] h-[45px]' src={'https://m.media-amazon.com/images/I/81AaLA+UjVL._AC_SX342_SY445_.jpg'} alt="" />
                                                <div>
                                                    <h2>Prudhvi</h2>
                                                    <p>
                                                        <span>Brand : </span>
                                                        <span>Apple </span>
                                                        <span className='text-lg'>Quantity : 2</span>
                                                    </p>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[68%]'>
                            <div className='pl-3'>
                                <div className='mt-4 flex flex-col'>
                                    <div key={''} className='text-[#d0d2d6] mb-6'>
                                            <div className='flex justify-start items-center gap-3'>
                                                <h2>Seller  order : </h2>
                                                <span>WareHouse</span>
                                            </div>
                                            <div className='flex gap-3 text-md mt-2'>
                                                    <img className='w-[45px] h-[45px]' src={'https://m.media-amazon.com/images/I/51XSS-sbTkL.__AC_SY445_SX342_QL70_FMwebp_.jpg'} alt="" />
                                                    <div>
                                                        <h2>Case</h2>
                                                        <p>
                                                            <span>Brand : </span>
                                                            <span>Apple </span>
                                                            <span className='text-lg'>Quantity : 2</span>
                                                        </p>
                                                    </div>
                                                </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails