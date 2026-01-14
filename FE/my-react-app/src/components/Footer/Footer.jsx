import React, { useContext } from 'react'
import './styles.css'
import { SidebarContext } from '../UserContext/SidebarContext';

const Footer = () => {
  const { isCollapsed } = useContext(SidebarContext);
  // const footerClasses = 'flex justify-between items-start border-2 px-5 bg-gray-100 text-shadow-lg absolute bottom-0';
  return (
    <div>
        <footer className= {`
          ${isCollapsed ? 'max-w-[96%]' : 'max-w-[98%]' }
          w-full mx-auto mt-1 flex justify-between items-start absolute border-2 px-5 bg-gray-100 text-shadow-lg rounded-xs transition-all duration-300 ease-in-out
        `}
         >
            <div className='flex gap-2 items-center'>
                <span>CloudKeeper 2025</span>
                <span className='text-lg text-slate-200'>|</span>
                <span>All Rights Reserved</span>
            </div>

            <div>
                <p>Contact Us</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer