// import { Company } from "../models/company.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const registerCompany = async (req, res) => {
//     try {
//         const { companyName } = req.body;
//         if (!companyName) {
//             return res.status(400).json({
//                 message: "Company name is required.",
//                 success: false
//             });
//         }
//         let company = await Company.findOne({ name: companyName });
//         if (company) {
//             return res.status(400).json({
//                 message: "You can't register same company.",
//                 success: false
//             })
//         };
//         company = await Company.create({
//             name: companyName,
//             userId: req.id
//         });

//         return res.status(201).json({
//             message: "Company registered successfully.",
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.id; // logged in user id
//         const companies = await Company.find({ userId });
//         if (!companies) {
//             return res.status(404).json({
//                 message: "Companies not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             companies,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getCompanyById = async (req, res) => {
//     try {
//         const companyId = req.params.id;
//         const company = await Company.findById(companyId);
//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
 
//         const file = req.file;
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         const logo = cloudResponse.secure_url;
    
//         const updateData = { name, description, website, location, logo };

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             message:"Company information updated.",
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }



import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// export const registerCompany = async (req, res) => {
//     try {
//         const { companyName } = req.body;
//         if (!companyName) {
//             return res.status(400).json({
//                 message: "Company name is required.",
//                 success: false
//             });
//         }
//         let company = await Company.findOne({ name: companyName });
//         if (company) {
//             return res.status(400).json({
//                 message: "You can't register same company.",
//                 success: false
//             })
//         };
//         company = await Company.create({
//             name: companyName,
//             userId: req.id
//         });

//         return res.status(201).json({
//             message: "Company registered successfully.",
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }







export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        console.log(req.body)
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false,
            });
        }
        
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,
            status: "Pending", // Company is pending approval
        });
        

        // Send notification email to employer
        const user = await User.findById(req.id);
        if (!user || !user.email) {
            return res.status(400).json({
                message: "User email is required.",
                success: false,
            });
        }
        console.log(req.body,user.email, 77)
        await sendCompanyApprovalEmail(user.email);

        return res.status(201).json({
            message: "Company registered successfully. Waiting for admin approval.",
            company,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Function to send email
const sendCompanyApprovalEmail = async (userEmail) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "saisaikiran7890@gmail.com", // Replace with your email
      pass: "jmof ildy dnxo grby", // Use an app password for security
    },
  });

  const mailOptions = {
    from: "saisaikiran7890@gmail.com",
    to: userEmail,
    subject: "Company Registration Pending Approval",
    text: "Your company registration is under review. You will receive an update once an admin approves or rejects it.",
  };

  await transporter.sendMail(mailOptions);
};




export const approveCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body; // "Approved" or "Rejected"

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status value.",
          success: false,
        });
      }
  
      const company = await Company.findById(id);

      if (!company) {
        return res.status(404).json({
          message: "Company not found.",
          success: false,
        });
      }
  
      company.status = status;
      console.log(company.status,136)
      await company.save();
 
  
      // Send email notification to employer
      await sendApprovalStatusEmail(company.userId, status);
  
      return res.status(200).json({
        message: `Company ${status.toLowerCase()} successfully.`,
        company,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  };
  
  // Function to send email to employer
  const sendApprovalStatusEmail = async (userId, status) => {
    const user = await User.findById(userId);
    if (!user) return;
  
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "saisaikiran7890@gmail.com",
        pass: "jmof ildy dnxo grby",
      },
    });
  
    const mailOptions = {
      from: "saisaikiran7890@gmail.com",
      to: user.email,
      subject: `Company Registration ${status}`,
      text: `Your company registration has been ${status.toLowerCase()} by the admin.`,
    };
  
    await transporter.sendMail(mailOptions);
  };







  
  





// export const getPendingCompanies = async (req, res) => {
//     try {
//         const pendingCompanies = await Company.find({ status: "Pending" }).populate('userId', 'email');
//         if (!pendingCompanies || pendingCompanies.length === 0) {
//             return res.status(404).json({
//                 message: "No pending companies found.",
//                 success: false,
//             });
//         }
//         return res.status(200).json({
//             pendingCompanies,
//             success: true,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.id; // logged in user id
//         const companies = await Company.find({ userId, status: "approved" })
//             .populate('userId', 'email')
//             .select('name status description location website logo createdAt updatedAt');
//             console.log(companies)
//         if (!companies || companies.length === 0) {
//             return res.status(404).json({
//                 message: "approved companies not found.",
//                 success: false
//             });
//         }
//         return res.status(200).json({
//             companies,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.id; // Logged-in user's ID
//         console.log(userId)

//         if (!userId) {
//             return res.status(401).json({
//                 message: "Unauthorized access.",
//                 success: false
//             });
//         }

//         // Find only approved companies linked to the logged-in user
//         const companies = await Company.find({ userId: userId, status: "approved" })
//             .populate('userId', 'email')
//             .select('name status description location website logo createdAt updatedAt');

//         if (!companies || companies.length === 0) {
//             return res.status(404).json({
//                 message: "No approved companies found for this user.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             companies,
//             success: true
//         });

//     } catch (error) {
//         console.error("Error fetching companies:", error);
//         res.status(500).json({ message: "Internal server error", success: false });
//     }
// };




export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Logged-in user's ID
        console.log(userId)

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized access.",
                success: false
            });
        }

        console.log("Logged-in User ID:", userId); // Debugging step

        // Convert userId to ObjectId for proper querying
        const companies = await Company.find({ userId: new mongoose.Types.ObjectId(userId), status: "approved" })
            .populate('userId', 'email')
            

        console.log("Filtered Companies:", companies); // Debugging step

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No approved companies found for this user.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};



export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('userId', 'name'); // Assuming userId references the User model and 'name' is the field for employer's name
        if (!companies) {
            return res.status(404).json({
                message: "No companies found.",
                success: false,
            });
        }
        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        console.log(companyId)
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}