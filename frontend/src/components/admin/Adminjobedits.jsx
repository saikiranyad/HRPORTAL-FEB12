import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { JOB_API_END_POINT } from '@/utils/constant';


const AdminJobEdit = () => {
    const { id } = useParams();  // Get the job id from the URL
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        education: '',
        salary: 0,
        location: '',
        jobType: '',
        experienceLevel: '',
        position: 0,

    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch job data when the component mounts
    const getJobById = async () => {
        try {
            const response = await axios.get(`${ JOB_API_END_POINT }/getjobid/${id}`, {
                withCredentials: true
            });
            if (response.data.success) {
                setInput({
                    ...response.data.job,
                    requirements: response.data.job.requirements.join(", ")
                });
            } else {
                toast.error('Job not found');
            }
        } catch (err) {
            console.error("Error fetching job:", err);
            toast.error('Error fetching job details');
        }
    };

    // Update the form input values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(input)
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        
        
    
        try {
            const response = await axios.put(
                `${JOB_API_END_POINT}/jobedit/${id}`,
                input,  // Send JSON directly
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true  // Send cookies with request
                }
            );
    
            if (response.data.success) {
                toast.success("Job updated successfully!");
                navigate('/admin/jobs');
            } else {
                toast.error(response.data.message || "Failed to update job.");
            }
        } catch (error) {
            console.error("Error updating job:", error.response ? error.response.data : error);
            toast.error(error.response?.data?.message || "Job update failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobById();
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Education</Label>
                            <Input
                                type="text"
                                name="education"
                                value={input.education}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experienceLevel"
                                value={input.experienceLevel
                                }
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={handleInputChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Edit Job</Button>
                    )}
                    <p className='text-xs text-red-600 font-bold text-center my-3'>
                        *Please register a company first, before posting a job.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminJobEdit;
