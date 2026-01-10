import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';

const FilterSelection = ({setActiveFilter})=>{

    const options = ["Select All", "Amazon API Gateway", "Amazon Athena", "Amazon Cloudfront", "Amazon Cognito"
        ,"Select All", "Amazon API Gateway", "Amazon Athena", "Amazon Cloudfront", "Amazon Cognito"
        ,"Select All", "Amazon API Gateway", "Amazon Athena", "Amazon Cloudfront", "Amazon Cognito"
    ]

    return (
        <div className=" z-4 mt-2 shadow-xl shadow-gray-200 rounded p-3.5">
            <p className='text-blue-800 font-semibold'>No filters currently selected</p>
            <input type="text" placeholder="Search" className='border rounded p-1 border-gray-300 mt-1 w-full mx-1.5'/>

            <p className='font-semibold mt-2.5'>Showing {options.length} results</p>
            <ul className=' h-100 overflow-y-auto'>
                {
                    options.map((optionName)=>(
                        <li key={optionName} className='flex h-7 mb-2.5 gap-1.5 text-gray-700 '>
                            <CheckBoxOutlineBlankSharpIcon className='border-gray-500'/>
                            
                            <p className='text-sm'>{optionName}</p>
                        </li>
                    ))
                }
            </ul>

            <hr className='border-t w-full border-gray-300'/>
            {/* <hr className='border-t -mx-3 border-gray-300'/> */}
            <div className='flex justify-end p-2 gap-5 mt-2.5'>
                <button className='text-blue-900 bg-white font-bold border rounded px-5 py-0.5 cursor-pointer' onClick={()=>setActiveFilter('')}>Close</button>
                <button className='text-white bg-zinc-500 shadow font-bold shadow-gray-300 rounded-md px-5 py-0.5'>Apply</button>
            </div>
        </div>
    )
}
export default FilterSelection;