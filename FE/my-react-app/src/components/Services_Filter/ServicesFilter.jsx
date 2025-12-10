import React, { useEffect, useRef, useState } from 'react'
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

function ServicesFilter() {

    const [open, setOpen] = useState(false);
    const modalRef = useRef();

    useEffect(()=>{

        const handleClickOutside = (e)=>{
            if(modalRef.current && !modalRef.current.contains(e.target)){
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return ()=> document.removeEventListener("mousedown", handleClickOutside);
    },[]);

  return (
    <div ref={modalRef} className='relative'>

        <button className='cursor-pointer' onClick={()=> setOpen((prev)=> !prev)}>
            <FilterAltOutlinedIcon/>
        </button>
        {
            open && (
                <div className='border rounded bg-white shadow-gray-500 shadow-2xl border-gray-400 absolute top-5 left-2 h-55 w-74'>
                    <input type="text" name="" id="" className='p-2 w-68 border-gray-400 text-black mt-3 border rounded' placeholder='Search'/>
                    <div className='flex'>
                        <select name="" id="" className='text-black mt-2 font-light text-sm ml-auto  p- '>
                            <option value="include_only" className='hover:bg-gray-300'>Include Only</option>
                            <option value="clear_filter" className='hover:bg-gray-300'>Clear Filter</option>
                            <option value="exclude_only" className='hover:bg-gray-300'>Exclude Only</option>
                        </select>
                    </div>

                    <div className='text-black mt-2'>
                        <label htmlFor="" className='flex items-center gap-1 mb-0.5 pl-3 cursor-pointer'>
                            <input type="checkbox" name="" id="" />
                            Select All
                        </label>
                        <label htmlFor="abc" className='flex items-center gap-1 mb-0.5 pl-3 cursor-pointer'>
                            <input type="checkbox" name="abc" id="abc" />
                            i-0097255fc5b94e76e
                        </label>
                        <label htmlFor="def" className='flex items-center gap-1 mb-0.5 pl-3 cursor-pointer'>
                            <input type="checkbox" name="def" id="def" />
                            i-0a909b63fd1db254
                        </label>
                        <label htmlFor="ghi" className='flex items-center gap-1 mb-0.5 pl-3 cursor-pointer'>
                            <input type="checkbox" name="ghi" id="ghi" />
                            i-0ea19794260a3111a
                        </label>
                        <label htmlFor="jkl" className='flex items-center gap-1 mb-0.5 pl-3 cursor-pointer'>
                            <input type="checkbox" name="jkl" id="jkl" />
                            i-02031016a38e7ef4
                        </label>
                    </div>

                    <div className='bg-blue-100 flex justify-end pr-2 gap-1.5 pt-1.5 pb-1'>
                        <button className='px-2 py-1 text-blue-900 border rounded bg-white cursor-pointer text-sm'>Cancel</button>
                        <button className='px-2 py-1 text-white border rounded bg-blue-900 cursor-pointer text-sm'>Apply</button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ServicesFilter