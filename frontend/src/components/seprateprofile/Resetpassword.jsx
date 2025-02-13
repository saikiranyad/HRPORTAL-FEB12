import React from 'react'

function Resetpassword() {

    
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
