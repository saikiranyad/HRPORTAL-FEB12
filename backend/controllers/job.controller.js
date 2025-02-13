// import { Job } from "../models/job.model.js";

// export const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, education, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !requirements || !education || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "Somethin is missing.",
//                 success: false
//             })
//         };
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             education,
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             company: companyId,
//             created_by: userId
//         });
//         return res.status(201).json({
//             message: "New job created successfully.",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//                 { education: { $regex: keyword, $options: "i" } },
//                 { location: { $regex: keyword, $options: "i" } },
//                 { requirements: { $regex: keyword, $options: "i" } },
//                 { jobType: { $regex: keyword, $options: "i" } },
//             ]
//         };
//         const jobs = await Job.find(query).populate({
//             path: "company"
//         }).sort({ createdAt: -1 });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }



// // student
// export const getJobById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         console.log("Job ID received:", id); // Debugging

//         if (!id || id === "undefined") {
//             return res.status(400).json({
//                 message: "Invalid Job ID",
//                 success: false
//             });
//         }

//         const job = await Job.findById(id).populate({
//             path: "applications"
//         });
//         console.log(job,85)

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({ job, success: true });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error", success: false });
//     }
// };



// export const getJobBySpecificId = async (req, res) => {
//     try {
//         const id = req.params.id;
//         // console.log(id, 89)
//         const job = await Job.findById(id).populate({
//             path: "company"
//         });
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found.",
//                 success: false
//             });
//         }
//         return res.status(200).json({
//             job,
//             success: true
//         });
//     } catch (err) {
//         console.error("Error fetching job:", err);
//         return res.status(500).json({
//             message: "Internal server error.",
//             success: false
//         });
//     }
// }
// export const editJobById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { title, description, requirements, education, salary, location, jobType, experienceLevel, position } = req.body;
// // console.log(req.body,168)
//         const job = await Job.findByIdAndUpdate(id, {
//             title, description, requirements, education, salary: Number(salary),
//             location, jobType, experienceLevel, position
//         }, { new: true });

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Job updated successfully.",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         return res.status(500).json({
//             message: "Internal server error.",
//             success: false
//         });
//     }
// };



// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId }).populate({
//             path: 'company',
//             createdAt: -1
//         });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }





// export const deleteJobById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         console.log(id)
//         const job = await Job.findByIdAndDelete(id);
//         console.log(job)

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Job deleted successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.error("Error deleting job:", error);
//         return res.status(500).json({
//             message: "Internal server error.",
//             success: false
//         });
//     }
// };


import { Job } from "../models/job.model.js";
import {Company} from '../models/company.model.js'

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, education, salary, location, jobType, experience, position,industry, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !education || !salary || !location || !jobType || !experience  || !industry || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            education,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            industry:industry,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// export const getAllJobs = async (req, res) => {



    export const getAllJobs = async (req, res) => {
        try {
            const keyword = req.query.keyword || "";
            const industry = req.query.industry || "";
    
            let query = {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                    { education: { $regex: keyword, $options: "i" } },
                    { location: { $regex: keyword, $options: "i" } },
                    { requirements: { $regex: keyword, $options: "i" } },
                    { jobType: { $regex: keyword, $options: "i" } },
                    { industry: { $regex: keyword, $options: "i" } },
                ]
            };
    
            if (industry) {
                // Find companies in the given industry
                const companies = await Company.find({ industry: { $regex: industry, $options: "i" } }).select('_id');
                const companyIds = companies.map(company => company._id);
                
                // Filter jobs by company ID
                query.company = { $in: companyIds };
            }
    
            const jobs = await Job.find(query)
                .populate({ path: "company" })
                .sort({ createdAt: -1 });
    
            if (!jobs.length) {
                return res.status(404).json({ message: "No jobs found.", success: false });
            }
    
            return res.status(200).json({ jobs, success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error", success: false });
        }
    };
    
//     try {
       
//         const keyword = req.query.keyword || "";
//         console.log(keyword)
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//                 { education: { $regex: keyword, $options: "i" } },
//                 { location: { $regex: keyword, $options: "i" } },
//                 { requirements: { $regex: keyword, $options: "i" } },
//                 { jobType: { $regex: keyword, $options: "i" } },
//                 { company: { $regex: keyword, $options: "i" } },
//             ]
//         };
//         const jobs = await Job.find(query).populate({
//             path: "company"
//         }).sort({ createdAt: -1 });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// student
export const getJobById = async (req, res) => {
    try {
        const id = req.params.id;

        const job = await Job.findById(id).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

export const getJobBySpecificId = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id, 89)
        const job = await Job.findById(id).populate({
            path: "company"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (err) {
        console.error("Error fetching job:", err);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

// export const editJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const { title, description, requirements, education, salary, location, jobType, experience, position, companyId } = req.body;
//         console.log(req.body)
//         if (!title || !description || !requirements || !education || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "All fields are required.",
//                 success: false
//             });
//         }

//         const job = await Job.findByIdAndUpdate(
//             jobId,
//             {
//                 title,
//                 description,
//                 requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
//                 education,
//                 salary: Number(salary),
//                 location,
//                 jobType,
//                 experienceLevel: experience,
//                 position,
//                 company: companyId
//             },
//             { new: true }
//         );
//         console.log(job)

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Job updated successfully.",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         return res.status(500).json({
//             message: "Internal server error.",
//             success: false
//         });
//     }
// };


export const editJobById = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, requirements, education, salary, location, jobType, experienceLevel, position } = req.body;
// console.log(req.body,168)
        const job = await Job.findByIdAndUpdate(id, {
            title, description, requirements, education, salary: Number(salary),
            location, jobType, experienceLevel, position
        }, { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};



export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}





export const deleteJobById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const job = await Job.findByIdAndDelete(id);
        console.log(job)

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
