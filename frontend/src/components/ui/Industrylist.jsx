
// import React, { useEffect, useState, useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import Edulisting from "../ui/Edulisting";

// import { Button } from "./button"; // Ensure this is correct
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
// import Induslisting from './Induslisting';
// import { Link, Navigate, useNavigate } from 'react-router-dom';



// function Industrylist() {
//     // const { companies } = useSelector((store) => store.job);
//     const [filterData, setFilterData] = useState([]);
//     const [filterData2, setFilterData2] = useState([]);
//     const [filteredCompanies, setFilteredCompanies] = useState([]); // New state for filtered companies

//     const [loading, setLoading] = useState(true);
//     const { companies } = useSelector((store) => store.company)
//     const { allJobs } = useSelector((store) => store.job);
//     const navigate = useNavigate();


//     console.log(companies)
//     // Load all jobs initially
//     useEffect(() => {

//         if (companies && companies.length > 0) {
//             setFilterData2(companies);
//             setLoading(false);
//         }
//     }, [companies]);

//     //count jobs
//     const countJobs = useMemo(() => {
//         if (!allJobs) return {};

//         return allJobs.reduce((acc, job) => {
//             if (job.education) {
//                 acc[job.education] = (acc[job.education] || 0) + 1;
//             }
//             return acc;
//         }, {});
//     }, [allJobs]);
//     // Count industry
//     const countIndustry = useMemo(() => {
//         if (!companies || companies.length === 0) return {};

//         return companies.reduce((acc, job) => {
//             if (job.industry) {
//                 acc[job.industry] = (acc[job.industry] || 0) + 1;
//             }
//             return acc;
//         }, {});
//     }, [companies]);
//     console.log(countIndustry)


//     const handleClickIndustry = (industry) => {
//         const filtered = companies.filter((company) => company.industry === industry);
//         console.log(filtered);
//         setFilteredCompanies(filtered); // Update the state with filtered companies
//         navigate(`/navindustrylisting/${industry}`);
//     };
//     console.log(companies)

//     const handleClick = (req) => {
//         const filtered = allJobs.filter((job) => job.education === req);

//         console.log("Clicked Education:", req);
//         console.log("Filtered Data:", filtered);  // ✅ Check filtered jobs in the console


//         setFilterData([...filtered]);  // ✅ Ensure state updates
//     };
//     console.log(filterData)
//     return (
//         <div>


//             {/* -------------------------------col list------------------------ */}
//             <div className="border-red-500 bg-[#fffa]  p-5 shadow-xl  rounded-xl">
//                 <div className="flex gap-4 justify-between border-red-500  p-5 my-3">
//                     <div>
//                         <h1 className="font-bold py-4">heading</h1>
//                         <div className="  border-4 border-black-500 bg-[#f8fafc]
//                         shadow-2xl p-4 bg-[#544a1a]   rounded-xl ">

//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>

//                         </div>
//                     </div>

//                     {/* -----------div1-------- */}

//                     <div className='   hover:shadow-black-lg transition-shadow duration-300'>
//                         <h1 className="font-bold py-4">heading</h1>
//                         <div className="  border-4 border-black-500 bg-[#f8fafc]
//                         shadow-2xl p-4 bg-[#544a1a] hover:bg-[]  rounded-xl ">

//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
//                             <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>

//                         </div>
//                     </div>
//                     {/* ----------div2--------- */}

//                     {/* ------------------ */}
//                     {/* ------------------ */}
//                     {/* <div>
//                         <h1 className="font-bold">Induslisting</h1>
//                         <div className='one'>
//                             <div className=" flex   border-blue-500 p-4 bg-[#fffaec]  gap-4">
//                                 <div className="flex flex-col   py-4 ">
//                                     <h3 className="text-bold font-bold border-blue-500 "> Industrial List</h3>
//                                     {Object.keys(countIndustry).slice(0,6).map((industry, index) => (
//                             <Button
//                                 key={index}
//                                 variant="outline"
//                                 onClick={() => handleClickIndustry(industry)}
//                                 className="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-100"
//                             >
//                                 {industry} ({countIndustry[industry]})
//                             </Button>
//                         ))}


//                                 </div>
//                                 <div className="flex flex-col border-solid">
//                                     <h3 className="text-bold font-bold ">count</h3>
//                                     {Object.keys(countIndustry).map((req, index) => (
//                                         <span key={index}>
//                                             {countIndustry[req]}
//                                         </span>
//                                     ))}

//                                 </div>




//                             </div>
//                         </div>

//                     </div> */}

//                     <div className=" mx-full p-4 pt-0">
//                         <h1 className="text-2xl font-bold mb-4">Induslisting</h1>
//                         <div className="bg-[#fffaec] rounded-lg shadow-md overflow-hidden">
//                             <table className="w-full">
//                                 <thead>
//                                     <tr className="bg-blue-500 text-white">
//                                         <th className="py-2 px-4 text-left">Industrial List</th>
//                                         <th className="py-2 px-4 text-left">Count</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {Object.entries(countIndustry)
//                                         .slice(0, 6)
//                                         .map(([industry, count], index) => (
//                                             <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                                                 <td className="py-2 px-4">
//                                                     <Button
//                                                         variant="outline"
//                                                         onClick={() => handleClickIndustry(industry)}
//                                                         className="rounded-full px-4 py-2 border border-gray-300
//                                                          hover:bg-gray-100 text-left w-full"
//                                                     >
//                                                         {industry}
//                                                     </Button>
//                                                 </td>
//                                                 <td className="py-2 px-4">{count}</td>
//                                             </tr>
//                                         ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>


//                     {/* ---------div3---------- */}
//                 </div>

                


//             </div>
//             {/* -------------------------------col list end------------------------ */}
           

//             {/* ------------------- */}

//             {/* ------------------- */}



//         </div>
//     );
// }

// export default Industrylist;









import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Edulisting from "../ui/Edulisting";

import { Button } from "./button"; // Ensure this is correct
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import Induslisting from './Induslisting';
import { Link, Navigate, useNavigate } from 'react-router-dom';



function Industrylist() {
    // const { companies } = useSelector((store) => store.job);
    const [filterData, setFilterData] = useState([]);
    const [filterData2, setFilterData2] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]); // New state for filtered companies

    const [loading, setLoading] = useState(true);
    const { companies } = useSelector((store) => store.company)
    const { allJobs } = useSelector((store) => store.job);
    const navigate = useNavigate();


    console.log(companies)
    // Load all jobs initially
    useEffect(() => {

        if (companies && companies.length > 0) {
            setFilterData2(companies);
            setLoading(false);
        }
    }, [companies]);

    //count jobs
    const countJobs = useMemo(() => {
        if (!allJobs) return {};

        return allJobs.reduce((acc, job) => {
            if (job.education) {
                acc[job.education] = (acc[job.education] || 0) + 1;
            }
            return acc;
        }, {});
    }, [allJobs]);
    // Count industry
    const countIndustry = useMemo(() => {
        if (!companies || companies.length === 0) return {};

        return companies.reduce((acc, job) => {
            if (job.industry) {
                acc[job.industry] = (acc[job.industry] || 0) + 1;
            }
            return acc;
        }, {});
    }, [companies]);
    console.log(countIndustry)


    const handleClickIndustry = (industry) => {
        const filtered = companies.filter((company) => company.industry === industry);
        console.log(filtered);
        setFilteredCompanies(filtered); // Update the state with filtered companies
        navigate(`/navindustrylisting/${industry}`);
    };
    console.log(companies)

    const handleClick = (req) => {
        const filtered = allJobs.filter((job) => job.education === req);

        console.log("Clicked Education:", req);
        console.log("Filtered Data:", filtered);  // ✅ Check filtered jobs in the console


        setFilterData([...filtered]);  // ✅ Ensure state updates
    };
    console.log(filterData)
    return (
        <div>


            {/* -------------------------------col list------------------------ */}
            <div className="border-red-500 bg-[#fffa]  p-5 shadow-xl  rounded-xl">
                <div className="flex gap-4 justify-between border-red-500  p-5 my-3">
                    <div>
                        <h1 className="font-bold py-4">heading</h1>
                        <div className=" border-4 border-black-500 bg-[#f8fafc]
                        shadow-2xl p-4 bg-[`#544a1a`]   rounded-xl ">

                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>

                        </div>
                    </div>

                    {/* -----------div1-------- */}

                    <div className='   hover:shadow-black-lg transition-shadow duration-300'>
                        <h1 className="font-bold py-4">heading</h1>
                        <div className="  border-4 border-black-500 bg-[#f8fafc]
                        shadow-2xl p-4 bg-[`#544a1a`] hover:bg-[]  rounded-xl ">

                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>
                            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, dolore.</h1>

                        </div>
                    </div>
                    {/* ----------div2--------- */}

                  
                    <div className=" mx-full p-4 pt-0">
                        <h1 className="text-2xl font-bold mb-4">Induslisting</h1>
                        <div className="bg-[#fffaec] rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="py-2 px-4 text-left">Industrial List</th>
                                        <th className="py-2 px-4 text-left">Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(countIndustry)
                                        .slice(0, 6)
                                        .map(([industry, count], index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                <td className="py-2 px-4">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleClickIndustry(industry)}
                                                        className="rounded-full px-4 py-2 border border-gray-300
                                                         hover:bg-gray-100 text-left w-full"
                                                    >
                                                        {industry}
                                                    </Button>
                                                </td>
                                                <td className="py-2 px-4">{count}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {/* ---------div3---------- */}
                </div>

                


            </div>
            {/* -------------------------------col list end------------------------ */}
           

            


        </div>
    );
}

export default Industrylist;
