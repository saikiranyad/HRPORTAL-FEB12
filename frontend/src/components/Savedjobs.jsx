// import React, { useEffect, useState } from 'react';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// function Savedjobs() {
//     const { singleJob } = useSelector(store => store.job);
//     const { user } = useSelector(store => store.auth);
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);
//     const [savedJobs, setSavedJobs] = useState([]); // State to store saved jobs

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

//             if (res.data.success) {
//                 setIsApplied(true); // Update the local state
//                 const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
//                 dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     };

//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         const fetchSavedJobs = async () => {
//             try {
//                 const res = await axios.get(`${USER_API_END_POINT}/saved`, { withCredentials: true });
//                 if (res.data.success) {
//                     setSavedJobs(res.data.savedJobs); // Update state with fetched saved jobs
//                 }
//             } catch (error) {
//                 console.error("Error retrieving saved jobs:", error);
//             }
//         };

//         fetchSingleJob();
//         fetchSavedJobs();
//     }, [jobId, dispatch, user?._id]);

//     return (
//         <div className="max-w-7xl mx-auto my-10 px-6">
//             <h1 className="text-3xl font-semibold text-gray-800 border-b-4 border-gray-400 pb-4">Saved Jobs</h1>
//             <div className="my-8 space-y-8">
//                 {savedJobs.length > 0 ? (
//                     savedJobs.map(job => (
//                         <div key={job._id} className="bg-white rounded-lg shadow-lg border border-gray-300 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                             <div className="flex justify-between items-center">
//                                 <h1 className="font-semibold text-2xl text-gray-800">{job.title}</h1>
//                                 <Badge className="text-xs font-medium bg-gray-300 text-gray-700 py-1 px-3 rounded-full">{job.experiencelevel} Years</Badge>
//                             </div>
//                             <div className="mt-4 text-gray-700 space-y-2">
//                                 <h2 className="font-medium text-lg">Location: <span className="font-normal">{job.location}</span></h2>
//                                 <h2 className="font-medium text-lg">Education: <span className="font-normal">{job.education}</span></h2>
//                                 <h2 className="font-medium text-lg">Salary: <span className="font-normal">{job.salary} LPA</span></h2>
//                                 <h2 className="font-medium text-lg">Description: <span className="font-normal">{job.description}</span></h2>
//                             </div>
//                             <Button
//                                 onClick={isApplied ? null : applyJobHandler}
//                                 disabled={isApplied}
//                                 className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                                 {isApplied ? 'Already Applied' : 'Apply Now'}
//                             </Button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-lg text-gray-600">No saved jobs found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Savedjobs;






import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

function Savedjobs() {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [savedJobs, setSavedJobs] = useState([]); // State to store saved jobs

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/saved`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs); // Update state with fetched saved jobs
                }
            } catch (error) {
                console.error("Error retrieving saved jobs:", error);
            }
        };

        fetchSingleJob();
        fetchSavedJobs();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
        <Navbar/>
         <div className="max-w-7xl mx-auto my-10 px-6">
            <h1 className="text-3xl font-semibold text-gray-800 border-b-4 border-gray-400 pb-4">Saved Jobs</h1>
            <div className="my-8 space-y-8">
                {savedJobs.length > 0 ? (
                    savedJobs.map(job => (
                        <div key={job._id} className="bg-white rounded-lg shadow-lg border border-gray-300 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center">
                                <h1 className="font-semibold text-2xl text-gray-800">{job.title}</h1>
                                <Badge className="text-xs font-medium bg-gray-300 text-gray-700 py-1 px-3 rounded-full">{job.experiencelevel} Years</Badge>
                            </div>
                            <div className="mt-4 text-gray-700 space-y-2">
                                <h2 className="font-medium text-lg">Location: <span className="font-normal">{job.location}</span></h2>
                                <h2 className="font-medium text-lg">Education: <span className="font-normal">{job.education}</span></h2>
                                <h2 className="font-medium text-lg">Salary: <span className="font-normal">{job.salary} LPA</span></h2>
                                <h2 className="font-medium text-lg">Description: <span className="font-normal">{job.description}</span></h2>
                            </div>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-600">No saved jobs found.</p>
                )}
            </div>
        </div>
        </>
       
    );
}

export default Savedjobs;
