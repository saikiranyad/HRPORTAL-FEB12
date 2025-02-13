import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge'; // Ensure this is the correct path to the Badge component
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

function Navindustry() {
    const navigate = useNavigate();
    const { id } = useParams()

    const { companies } = useSelector(store => store.company);
    const requirements = companies.filter(industry => industry.industry === id);


    console.log(requirements);

    return (
        <>
        
        <Navbar />
     

       

        <div>
            <h1 className=' py-3 font-bold'>Industry Requirements</h1>
        <div className='grid-cols-3 grid gap-4 p-5 '>
                    {requirements.map(job => (

            <div onClick={() => navigate(`/description/${job?._id}`)}
                className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
                <div>
                    <div className='flex justify-between items-center'>
                    <h1 className='font-medium text-lg'> industry: {job?.industry}</h1>
                    <p className='text-sm text-gray-500'>India</p>

                    </div>
                    
                </div>
                <div>
                    <h1 className='text-blue-800 my-2'> website link:
                        <Link>
                        {job?.website}

                        </Link>
                        </h1>
                    <p className='text-sm text-gray-600'>description: {job?.description}</p>
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">place: {job?.location} </Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> company name: {job?.name} </Badge>
                </div>
            </div>
            ))}
        </div>
        </div>
        <Footer />
        </>
        );
        
}

export default Navindustry;