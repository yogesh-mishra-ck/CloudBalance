import React from 'react'
import './styles.css'

const Footer = () => {
  return (
    <div>
        <footer className='flex justify-between items-start border-2 px-5 bg-gray-100 text-shadow-lg absolute bottom-0 w-[1650px]'>
            <div className='flex gap-2'>
                <span>CloudKeeper 2025</span>
                <span className='text-lg relative bottom-1 text-slate-200'>|</span>
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