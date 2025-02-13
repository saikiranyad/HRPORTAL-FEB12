import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
// import { Badge } from './ui/badge';
import { Badge } from '../ui/badge';


function Induslisting({companies}) {
    const navigate= useNavigate();
        console.log(companies)
        
        
  return (
    <div>
        <div>
       
        </div>
      

      <div onClick={()=> navigate(`/description/${companies._id}`)} 
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{companies?.industry}</h1>
                <h1 className='font-medium text-lg'>{companies?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{companies?.website}</h1>
                {/* <p className='text-sm text-gray-600'>{companies?.description}</p> */}
                <p className='text-sm text-gray-600'>{companies?.description }</p>

            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{companies?.location} place</Badge>
                {/* <Badge className={'text-[#F83002] font-bold'} variant="ghost">{companies?.companiesType}</Badge> */}
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{companies?.name} company name</Badge>
            </div>

        </div>

    </div>
  )
}

export default Induslisting
