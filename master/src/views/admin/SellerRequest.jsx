import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { useSelector, useDispatch } from 'react-redux'
import Search from '../components/Search'
import { get_seller_request } from '../../store/Reducers/sellerReducer'
const SellerRequest = () => {
    const dispatch = useDispatch()
    const { sellers, totalSeller } = useSelector(state => state.seller)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [perPage, setPerPage] = useState(5)
    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(get_seller_request({
            perPage,
            searchValue,
            page: currentPage
        }))
    }, [perPage, searchValue, currentPage])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-black rounded-md'>
                <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-white'>
                        <thead className='text-xs text-white uppercase border-b border-slate-700'>
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
                            {
                                sellers.map((d, i) => <tr className='border-b border-slate-700' key={i}>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>{i + 1}</td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>{d.name}</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>{d.email}</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>{d.payment}</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <span>{d.status}</span>
                                    </td>
                                    <td scope='row' className='py-2 px-4 font-normal whitespace-nowrap'>
                                        <div className='flex justify-start items-center gap-4'>
                                            <Link to={`/admin/dashboard/seller/details/${d._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {
                    totalSeller <= perPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={50}
                            perPage={perPage}
                            showItem={4}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default SellerRequest