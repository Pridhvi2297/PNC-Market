import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BiLogInCircle } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { getNavs } from '../navigation/index'

const Sidebar = ({ showSidebar, setShowSidebar }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [allNav, setAllNav] = useState([])


  useEffect(() => {
    const navs = getNavs('admin')
    setAllNav(navs)
  }, [])

  return (
    <div>
      <div className={`fixed duration-200 w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}></div>
      <div className={`w-[260px] fixed bg-black z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}>
        <div className='h-[70px] flex justify-center items-center'>
          <Link to='/' className='w-[180px] h-[60px]'>
            <img className='w-full h-full' src="/logo.png" alt="" />
          </Link>
        </div>
        <div className='px-[16px] py-10'>
          <ul>
            {
              allNav.map((n, i) => <li key={i}>
                <Link to={n.path} className={`${pathname === n.path ? 'bg-slate-600 shadow-indigo-500/30 text-white duration-500 ' : 'text-[#d0d2d6] font-normal duration-200'} px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}>
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>)
            }
            <li>
              <button className='text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 '>
                <span><BiLogInCircle /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar