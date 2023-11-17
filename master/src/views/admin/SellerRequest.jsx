import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { useSelector, useDispatch } from 'react-redux'
import Search from '../components/Search'

const SellerRequest = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const obj = {
          parPage: parseInt(parPage),
          page: parseInt(currentPage),
          searchValue,
        };
      }, [searchValue, currentPage, parPage]);
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-black rounded-md'>
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Payment Status</th>
                                <th scope='col' className='py-3 px-4'>Status</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-normal'>
                            <tr className='border-b border-slate-700' key={''}>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>1</td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>Alibaba</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>Alibaba@Alibaba.com</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>done</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>view</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <div className='flex justify-start items-center gap-4'>
                                            <Link to={`/admin/dashboard/seller`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={50}
                            parPage={parPage}
                            showItem={4}
                        />
                    </div>
            </div>
        </div>
    )
}

export default SellerRequest