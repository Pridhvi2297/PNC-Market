import React from 'react'
import { BiStar, BiSolidStarHalf, BiSolidStar } from 'react-icons/bi'
const Ratings = ({ ratings }) => {
    return (
        <>
            {
                ratings >= 1 ? <span className='text-[#EDBB0E]'><BiSolidStar /></span> : ratings >= .5 ? <span className='text-[#EDBB0E]'><BiSolidStarHalf /></span> : <span className='text-slate-600'><BiStar /></span>
            }
            {
                ratings >= 2 ? <span className='text-[#EDBB0E]'><BiSolidStar /></span> : ratings >= 1.5 ? <span className='text-[#EDBB0E]'><BiSolidStarHalf /></span> : <span className='text-slate-600'><BiStar /></span>
            }
            {
                ratings >= 3 ? <span className='text-[#EDBB0E]'><BiSolidStar /></span> : ratings >= 2.5 ? <span className='text-[#EDBB0E]'><BiSolidStarHalf /></span> : <span className='text-slate-600'><BiStar /></span>
            }
            {
                ratings >= 4 ? <span className='text-[#EDBB0E]'><BiSolidStar /></span> : ratings >= 3.5 ? <span className='text-[#EDBB0E]'><BiSolidStarHalf /></span> : <span className='text-slate-600'><BiStar /></span>
            }
            {
                ratings >= 5 ? <span className='text-[#EDBB0E]'><BiSolidStar /></span> : ratings >= 4.5 ? <span className='text-[#EDBB0E]'><BiSolidStarHalf /></span> : <span className='text-slate-600'><BiStar /></span>
            }
        </>
    )
}

export default Ratings