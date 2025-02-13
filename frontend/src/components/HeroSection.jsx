// import React, { useEffect, useState } from 'react'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//     const [query, setQuery] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const searchJobHandler = () => {
//         if (!query.trim()) {
//             alert("Please enter a search query.");
//             return;
//         }
//         dispatch(setSearchedQuery(query));
//         navigate("/browse");
//     }
   
//     return (
//         <div className='text-center'>
//             <div className='flex flex-col gap-5 my-10'>
//                 {/* <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] '>No. 1 Job Hunt Website</span> */}
//                 <p className='text-3xl font-bold'>Search, Apply & <br /> Get Your 
//                 <span className='text-[#6A38C2]'>Dream Jobs</span></p>
//                 <p>"Where Talent Meets the Right Opportunity"</p>
//                 <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
//                     <input
//                         type="text"
//                         placeholder='Find your dream jobs'
//                         onChange={(e) => setQuery(e.target.value)}
//                         required
//                         className='outline-none border-none w-full'

//                     />
//                     <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
//                         <Search className='h-5 w-5' />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection


// import React, { useEffect, useState } from 'react'
import React, { useEffect, useState, useMemo } from 'react';

import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
// import { setEducationFilter, setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import Edulisting from './ui/Edulisting';
import { setSearchedQuery } from '@/redux/jobSlice';





const HeroSection = () => {

    const { allJobs } = useSelector((store) => store.job);
    const [filterData, setFilterData] = useState([]);

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        if (!query.trim()) {
            alert("Please enter a search query.");
            return;
        }
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }


     // -------------------function-----------------

    const handleEducationClick = (educationName) => {
        const filteredJobs = allJobs.filter((job) => {
            return job.education === educationName;
            
        });
        console.log(filteredJobs);
        navigate(`/naveducationlisting/${educationName}`)
        return filteredJobs;
    };
    //count jobs


    // -----------------------
    const countJobs = useMemo(() => {
        if (!allJobs) return {};

        return allJobs.reduce((acc, job) => {
            if (job.education) {
                acc[job.education] = (acc[job.education] || 0) + 1;
            }
            return acc;
        }, {});
    }, [allJobs]);

   

    const allJobIds = useMemo(() => {
        return allJobs.map(job => job._id);
    }, [allJobs]);
    useEffect(() => {
        setFilterData(allJobs);
    }, [allJobs]);
    return (

        <div className='text-center'>


            {/* <div className='bg-gray-900  w-[75%]'> */}


            <div className="flex justify-between ">


                {/* -------------------------div1------------------------- */}
                <div className='flex w-[65%] shadow-lg border border-gray-100 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <IoSearch className='' />
                    <input

                        type="text"

                        placeholder='Search by jobs, company, skills'
                        onChange={(e) => setQuery(e.target.value)}
                        required
                        className='outline-none border-none w-full'

                    />

                    {/* </div> */}
                    {/* -------------------------div1 end------------------------- */}

                    {/* ------------------------  div2------------------------------- */}
                    <div className='flex w-[45%] gap-2 border-l border-r border-gray-500'>
                        <FaLocationDot className=' ms-4 ' />
                        <input


                            type="text"

                            placeholder='location'
                            onChange={(e) => setQuery(e.target.value)}
                            required
                            className='outline-none border-none w-full'

                        />
                    </div>

                    {/* ------------------------  div2 end ------------------------------- */}
                    {/* ------------------------  div3  ------------------------------- */}

                    <div className='flex gap-2'>
                        <FaBookReader />
                        <input
                            type="text"
                            placeholder='Experience'
                            onChange={(e) => setQuery(e.target.value)}
                            required
                            className='outline-none border-none w-full'

                        />
                    </div>

                    {/* ------------------------  div3 end ------------------------------- */}
                    {/* -----------------div4------------- */}
                    <div className='w-[5%]'>
                        <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">

                            <Search className='h-5 w-5' />
                        </Button>
                    </div>



                </div>
                {/* ---------------------div4 end--------------------- */}

            </div>

            {/* </div> */}

            <div className='flex px-5 gap-2 mt-4 justify-center items-center'>
                <h1 className='text-orange-700'>Education list: </h1>


                {Object.keys(countJobs).slice(0, 7).map((req, index) => (
                    //    <CarouselItem className="md:basis-1/3 lg-basis-1/3">
                    <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleEducationClick(req)}
                        className="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-100"
                    >
                        {req} ({countJobs[req]})
                    </Button>

                ))}
                
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">

            </div>


        </div>
    )
}

export default HeroSection