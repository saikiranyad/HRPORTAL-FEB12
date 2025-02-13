// import React from 'react'
// import LatestJobCards from './LatestJobCards';
// import { useSelector } from 'react-redux'; 

// // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

// const LatestJobs = () => {
//     const {allJobs} = useSelector(store=>store.job);
   
//     return (
//         <div className='max-w-7xl mx-auto my-20'>
//             <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
//             <div className='grid grid-cols-3 gap-4 my-5'>
//                 {
//                     allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default LatestJobs





import LatestJobCards from "./LatestJobCards"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)

  const displayedJobs = allJobs.slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {displayedJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          displayedJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
      <div className="flex justify-center mt-8">
        {user ? (
          <Link to="/jobs">
            <Button variant="outline">View All Jobs</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="outline">Login to view all jobs</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default LatestJobs