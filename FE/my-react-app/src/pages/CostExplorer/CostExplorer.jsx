import React, { useState } from 'react'
import { users } from '../../utils/mockupData'
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function CostExplorer() {

    const data = users;
    
    const [updatedData,setUpdatedData] = useState(data.map(prev=>({...prev, isActive: false})))
    const toggleStatus = (id)=>{
        setUpdatedData(prevData => 
            prevData.map(user => 
                user.id === id ? {...user, isActive: !user.isActive } : user
            )
        )
    }

    return (
        <>
            <table className='w-[1300px] border-collapse'>
                <thead>
                    <tr className='[&_th]:bg-gray-400 [&_th]:px-4 [&_th]:py-2 [&_th]:border-r [&_th]:rounded-sm'>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Roles</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                        {
                            updatedData.map((currentUser)=>(
                                <tr key={currentUser.id} className='[&_td]:bg-sky-200 [&_td]:px-4 [&_td]:py-2 [&_td]:border [&_td]:border-gray-400 [&_td]:shadow-sm'>
                                    <td >{currentUser.firstName}</td>
                                    <td>{currentUser.lastName}</td>
                                    <td>{currentUser.email}</td>
                                    <td>
                                        <div className='flex gap-2'>
                                            {
                                                currentUser.roles.map((role, index)=>(
                                                    <span key={index} className='bg-sky-100 py-1 px-3 border rounded-sm '>{role}</span>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td>{currentUser.lastLogin}</td>
                                    <td className="flex items-center gap-4">
                                        <div 
                                            onClick={() => toggleStatus(currentUser.id)} 
                                            className="cursor-pointer flex" 
                                        >
                                            {
                                                currentUser.isActive ? 
                                                <ToggleOnIcon fontSize="large" className="text-blue-500" /> :
                                                <ToggleOffIcon fontSize="large" className="text-gray-500" />
                                            }
                                        </div>
                                        <EditIcon className="cursor-pointer" />
                                    </td>

                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </>
    )
}

export default CostExplorer