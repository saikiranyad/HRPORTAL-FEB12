import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
function Naveducation() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { allJobs } = useSelector(store => store.job);
  const requirements = allJobs.filter(job => job.education === id);

  return (
    
    <div>

   
      <Navbar />
      <h1 className='font-bold py-2'>Education Listing</h1>



      <div className='grid-cols-3 grid gap-4 p-5 '>

        {requirements.map(job => (
          <div key={job._id} onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
              <div className="flex justify-between items-center">
              <h1 className='font-bold text-lg my-2'>{job?.title}</h1>

              <p className='text-sm text-gray-500'>India</p>
              </div>
              
            </div>
            <div>
              <h1 className='font-medium text-lg'>company_name: {job?.company?.name}</h1>

              <p className='text-sm text-gray-600 '>description: {job?.description}</p>
              <p className='text-sm text-gray-600'>Qualification: {job?.education}</p>
            </div>
            <div className='flex items-center justify-between gap-2 mt-4'>
              <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
              <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
              <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
          </div>
        ))}
      </div>
      <Footer />
      </div>
    

  )
}

export default Naveducation