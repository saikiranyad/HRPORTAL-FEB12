// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard'
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';

// // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job);
//     const [filterJobs, setFilterJobs] = useState(allJobs);

//     useEffect(() => {
//         if (searchedQuery) {
//             const filteredJobs = allJobs.filter((job) => {
//                 return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             })
//             setFilterJobs(filteredJobs)
//         } else {
//             setFilterJobs(allJobs)
//         }
//     }, [allJobs, searchedQuery]);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto mt-5'>
//                 <div className='flex gap-5'>
//                     <div className='w-20%'>
//                         <FilterCard />
//                     </div>
//                     {
//                         filterJobs.length <= 0 ? <span>Job not found</span> : (
//                             <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
//                                 <div className='grid grid-cols-3 gap-4'>
//                                     {
//                                         filterJobs.map((job) => (
//                                             <motion.div
//                                                 initial={{ opacity: 0, x: 100 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 exit={{ opacity: 0, x: -100 }}
//                                                 transition={{ duration: 0.3 }}
//                                                 key={job?._id}>
//                                                 <Job job={job} />
//                                             </motion.div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>


//         </div>
//     )
// }

// export default Jobs





import { useEffect, useState } from "react"
import Navbar from "./shared/Navbar"
import FilterCard from "./FilterCard"
import Job from "./Job"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { setEducationFilter } from "@/redux/jobSlice"

const JOBS_PER_PAGE = 25

const Jobs = () => {
  const dispatch = useDispatch()
  const { allJobs, educationFilter } = useSelector((store) => store.job)
  console.log(allJobs)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredJobs, setFilteredJobs] = useState(allJobs)

//   useEffect(() => {
//     // Clear education filter when component mounts
//     dispatch(setEducationFilter(""))
//   }, [dispatch])

  useEffect(() => {
    if (educationFilter) {
      setFilteredJobs(allJobs.filter((job) => job.education === educationFilter))
    } else {
      setFilteredJobs(allJobs)
    }
    setCurrentPage(1)
  }, [ educationFilter])

  console.log(filteredJobs)
  const indexOfLastJob = currentPage * JOBS_PER_PAGE
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filteredJobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {currentJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs