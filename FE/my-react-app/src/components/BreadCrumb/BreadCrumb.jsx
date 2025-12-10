import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function BreadCrumb() {

    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x)=>x);
    const pathnamesRender = pathnames.slice(1);
  return (
    <nav className='w-max mb-1'>
        <ul className='flex'>
           
           {
                pathnamesRender.map((currPath, index)=>(

                    
                    <li key={index} className='text-gray-500'>
                        { index == 0 ? <div className='text-cyan-400'></div> : ''}
                        <Link to={'/dashboard/'+currPath}>{currPath.charAt(0).toUpperCase()+currPath.slice(1)}
                            {index === pathnamesRender.length-1 ? "" : ">"}
                        </Link>
                    </li>
                ))
           }
        </ul>
    </nav>
  )
}

export default BreadCrumb