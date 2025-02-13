
import React, { Profiler, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Mail, Contact, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import UpdateProfileDialog from '../UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { USER_API_END_POINT } from '@/utils/constant';



function Resetpassword() {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [input, setInput] = useState({ 

        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleResetPassword = async () => {
        setError('');
        setSuccess('');


        if (input.newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            return;
        }

        if (input.newPassword !== input.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await fetch(`${USER_API_END_POINT}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    
                    newPassword: input.newPassword,
                    confirmPassword: input.confirmPassword
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess("Password updated successfully!");
                setInput({ newPassword: '', confirmPassword: '' });
            } else {
                setError(data.message || 'Failed to update password. Please try again.');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred. Please try again.');
        }
    };

    const { user } = useSelector(store => store.auth);



    return (
      
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">


                    <div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-4">
                                <div className='flex'>
                                    <div>
                                        <h1 className="font-medium text-xl">Account details</h1>
                                    </div>
                                    <div>
                                        <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                                            <Pen height={'15px'} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-md font-bold">Password</p>
                            <p onClick={() => setIsOpen(!isOpen)} className="text-md font-bold text-blue-500 cursor-pointer">Change Password</p>
                            {isOpen && (
                                <div>
                                    <p>Your password should be at least 6 characters long and contain alphanumeric characters (a-z and 0-9)</p>

                                    <div className='my-2'>
                                        <Label>New Password</Label>
                                        <Input type='password' placeholder='Enter your new password' value={input.newPassword} name='newPassword' onChange={changeEventHandler} />
                                    </div>
                                    <div className='my-2'>
                                        <Label>Confirm Password</Label>
                                        <Input type='password' placeholder='Enter your confirm password' name='confirmPassword' value={input.confirmPassword} onChange={changeEventHandler} />
                                    </div>
                                    {error && <p className="text-red-600 mb-2">{error}</p>}
                                    {success && <p className="text-green-600 mb-2">{success}</p>}
                                    <div className='flex justify-end'>
                                        <Button onClick={handleResetPassword}>Save</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
     

            </div>
            )
}

            export default Resetpassword
