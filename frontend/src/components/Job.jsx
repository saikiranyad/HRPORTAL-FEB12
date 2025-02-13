import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchSavedStatus = async () => {
  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(`${USER_API_END_POINT}/user/savedJobs`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //         withCredentials: true,
  //       });

  //       setIsSaved(response.data.savedJobs.includes(job._id));
  //     } catch (error) {
  //       console.error('Error fetching saved jobs status:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSavedStatus();
  // }, [job._id, token]);

  // const handleSaveUnsave = async (e) => {
  //   e.preventDefault();
  //   if (!token) {
  //     alert('You need to be logged in to save jobs');
  //     return;
  //   }

  //   try {
  //     const action = isSaved ? 'unsave' : 'save';
  //     console.log(action)
      
  //     // Make the request to the backend and wait for response
  //     const response = await axios.put(
  //       `${USER_API_END_POINT}/save-or-unsave`,
  //       { jobId: job._id, action },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.data.success) {
  //       // setIsSaved(!isSaved); // Update state only if API call is successful
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error saving or unsaving job:', error);
  //     alert(error.response?.data?.message || 'Failed to update saved jobs');
  //   }
  // };




  


  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`${USER_API_END_POINT}/check-job-saved/${job._id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
  
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error('Error fetching saved jobs status:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSavedStatus();
  }, [job._id, token]);
  
  const handleSaveUnsave = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You need to be logged in to save jobs');
      return;
    }
  
    try {
      const action = isSaved ? 'unsave' : 'save';
      const response = await axios.put(
        `${USER_API_END_POINT}/save-or-unsave`,
        { jobId: job._id, action },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        setIsSaved(action === 'save'); // Ensure state updates correctly
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error saving or unsaving job:', error);
      alert(error.response?.data?.message || 'Failed to update saved jobs');
    }
  };
  



  
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    return Math.floor((currentTime - createdAt) / (1000 * 60 * 60 * 24));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon" onClick={handleSaveUnsave}>
          {isSaved ? <BookmarkCheck className="text-green-600" /> : <Bookmark />}
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
        <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button 
          className={`bg-[#7209b7] ${isSaved ? "opacity-70" : ""}`} 
          onClick={handleSaveUnsave}
        >
          {isSaved ? "Unsave" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
