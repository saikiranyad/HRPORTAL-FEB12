// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";
// import { questionsByCategory } from "../utils/questions.js";
// import nodemailer from "nodemailer"
// import { Job } from '../models/job.model.js'
// import mongoose from "mongoose";



// // const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// // const sendOtp = async (email, otp) => {
// //     const transporter = nodemailer.createTransport({
// //         service: "Gmail",
// //         auth: {
// //             user: 'silkmuttu2003@gmail.com',
// //             pass: 'xwcl ucrb agdq pwsn',
// //         },
// //     });

// //     const mailOptions = {
// //         from:'silkmuttu2003@gmail.com',
// //         to: email,
// //         subject: "Your OTP Code",
// //         text:` Your OTP code is ${otp}. It is valid for 10 minutes`
// //     }

// //     await transporter.sendMail(mailOptions);
// // };

// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role, gender } = req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role || !gender) {
//       return res.status(400).json({ message: "Something is missing", success: false });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists with this email.", success: false });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // const otpCode = generateOtp();
//     // const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

//     // await sendOtp(email, otpCode);

//     const newUser = new User({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       gender,
//       // otp: { code: otpCode, expiry: otpExpiry },
//       profile: { profilePhoto: "" },
//     });

//     await newUser.save();

//     return res.status(201).json({ message: "OTP sent to email. Please verify to complete registration.", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

// // export const verifyOtp = async (req, res) => {
// //   try {
// //       const { email, otp } = req.body;
// //       console.log("Request Body:", req.body);

// //       if (!email || !otp) {
// //           return res.status(400).json({ message: "Email and OTP are required.", success: false });
// //       }

// //       const user = await User.findOne({ email });

// //       if (!user) {
// //           return res.status(400).json({ message: "User not found.", success: false });
// //       }

// //       // Check if OTP is already verified
// //       if (user.otp.verified) {
// //           return res.status(400).json({ message: "OTP already verified.", success: false });
// //       }

// //       // Debugging logs to check OTP values
// //       console.log("Stored OTP:", user.otp.code);
// //       console.log("Entered OTP:", otp);
// //       console.log("OTP Expiry:", user.otp.expiry);

// //       // Validate OTP and expiry
// //       if (user.otp.code !== otp || user.otp.expiry < new Date()) {
// //           return res.status(400).json({ message: "Invalid or expired OTP.", success: false });
// //       }

// //       // Mark OTP as verified and save
// //       user.otp.verified = true;
// //       await user.save();

// //       return res.status(200).json({ message: "OTP verified successfully. Registration complete.", success: true });
// //   } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: "Server error", success: false });
// //   }
// // };

// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "Something is missing", success: false });
//     }

//     let user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password)) || role !== user.role) {
//       return res.status(400).json({ message: "Incorrect email, password, or role.", success: false });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

//     return res.status(200).cookie("token", token, {
//       maxAge: 86400000,
//       httpOnly: true,
//       secure: true,
//       sameSite: 'None',
//       path: '/',
//     }).json({
//       message: `Welcome back ${user.fullname}`,
//       user,
//       token,
//       success: true
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully.",
//       success: true
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };



// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, housetype, hno, street, city, area, district, pincode, fathername, aaddharnum, languages, bio, skills, dateofbirth, maritalstatus, category, companydetails, technologyworked, companyaddress, zone, gst, pan, height, weight, Bloodgroup, Experiencelevel, directjob, trainingrequired, expectedsalary, negotiable, hrsatisfactory, hrusername, hremail } = req.body;

//     const userId = req.id;
//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({ message: "User not found.", success: false });
//     }

//     user.profile = user.profile || {};
//     user.personaldetails = user.personaldetails || {};
//     user.workhistory = user.workhistory || { natureofwork: {} };
//     user.PhysicalDetails = user.PhysicalDetails || {};
//     user.addressdetails = user.addressdetails || {};
//     user.hrexe = user.hrexe || {};
//     user.education = user.education || {}



//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (housetype) user.addressdetails.housetype = housetype;
//     if (hno) user.addressdetails.hno = hno;
//     if (street) user.addressdetails.street = street;
//     if (area) user.addressdetails.area = area;
//     if (city) user.addressdetails.city = city;
//     if (district) user.addressdetails.district = district;
//     if (pincode) user.addressdetails.pincode = pincode;
//     // personal details

//     if (fathername) user.personaldetails.fathername = fathername
//     if (aaddharnum) user.personaldetails.aaddharnum = aaddharnum
//     if (dateofbirth) user.personaldetails.dateofbirth = dateofbirth
//     if (Experiencelevel) user.Experiencelevel = Experiencelevel
//     if (languages) user.languages = languages;
//     if (companydetails) user.workhistory.natureofwork.companydetails = companydetails;
//     if (companyaddress) user.workhistory.natureofwork.companyaddress = companyaddress;
//     if (technologyworked) user.workhistory.technologyworked = technologyworked;

//     if (zone) user.workhistory.natureofwork.zone = zone;
//     if (req.body.education) {
//       // Parse if education is a string (from FormData)
//       let educationData = req.body.education;

//       if (typeof educationData === 'string') {
//         educationData = JSON.parse(educationData);
//       }
//       console.log(educationData)
//       user.education = educationData
//     }


//     if (user.role === 'jobseeker') {
//       // work history
//       if (technologyworked) user.workhistory.technologyworked = technologyworked;
//       if (companydetails) user.workhistory.natureofwork.companydetails = companydetails;
//       if (companyaddress) user.workhistory.natureofwork.companyaddress = companyaddress;
//       if (zone) user.workhistory.natureofwork.zone = zone;

//       // physical details
//       if (height) user.PhysicalDetails.height = height;
//       if (weight) user.PhysicalDetails.weight = weight;
//       if (Bloodgroup) user.PhysicalDetails.Bloodgroup = Bloodgroup;
//       // Languages
//       if (languages) user.languages = languages;
//       if (Experiencelevel) user.Experiencelevel = Experiencelevel
//       // hrexe

//       if (directjob) user.hrexe.directjob = directjob
//       if (trainingrequired) user.hrexe.trainingrequired = trainingrequired
//       if (expectedsalary) user.hrexe.expectedsalary = expectedsalary
//       if (negotiable) user.hrexe.negotiable = negotiable
//       if (hrsatisfactory) user.hrexe.hrsatisfactory = hrsatisfactory
//       if (hrusername) user.hrexe.hrusername = hrusername
//       if (hremail) user.hrexe.hremail = hremail


//     }

//     // HR-specific fields
//     if (user.role === "Hr" || user.role === "Employeer") {
//       if (bio) user.profile.bio = bio;
//       if (maritalstatus) user.profile.maritalstatus = maritalstatus;
//       if (category) user.profile.category = category;
//       if (gst) user.profile.gst = gst;
//       if (pan) user.profile.pan = pan;
//     }
//     // Update skills only for jobseekers

//     if (skills && user.role === "jobseeker") {
//       user.profile.skills = skills.split(",");
//     }

//     // File upload for resume (if HR is uploading their resume)

//     if (req.file) {
//       const fileUri = getDataUri(req.file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = req.file.originalname;
//     } else {
//       console.error("File upload failed: req.file is undefined");
//     }
//     console.log(user.profile.resume)

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       user,
//       success: true
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const getAssessment = async (req, res) => {
//   try {
//     const userId = req.id
//     console.log("Fetching assessment for user:", userId)

//     const user = await User.findById(userId)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       })
//     }

//     // Return the assessment data
//     res.status(200).json({
//       success: true,
//       specialization: user.skillAssessment?.specialization || "",
//       technical: user.skillAssessment?.technical || "",
//       questions: user.skillAssessment?.questions || {
//         "Personal / Psychology / Aptitude": [],
//         Technical: [],
//         "Professional / Responsibility": [],
//       },
//     })
//   } catch (error) {
//     console.error("Error in getAssessment:", error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }

// export const submitAssessment = async (req, res) => {
//   try {
//     const userId = req.id
//     const { specialization, technical, questions } = req.body

//     console.log("Submitting assessment for user:", userId)
//     console.log("Assessment data:", { specialization, technical, questions })

//     if (!specialization || !technical || !questions) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required assessment data",
//       })
//     }

//     const user = await User.findById(userId)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       })
//     }

//     // Update the skill assessment
//     user.skillAssessment = {
//       specialization,
//       technical,
//       questions: {
//         "Personal / Psychology / Aptitude": questions["Personal / Psychology / Aptitude"],
//         Technical: questions["Technical"],
//         "Professional / Responsibility": questions["Professional / Responsibility"],
//       },
//     }

//     await user.save()
//     console.log("Assessment saved successfully")

//     res.status(200).json({
//       success: true,
//       message: "Assessment submitted successfully",
//     })
//   } catch (error) {
//     console.error("Error in submitAssessment:", error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }

// export const getJobSeekerUsers = async (req, res) => {
//   try {
//     const query = {
//       role: "jobseeker"
//     }
//     const user = await User.find(query)
//     return res.status(200).json({
//       user,
//       success: true
//     })
//   } catch (error) {
//     console.error("Error in submitAssessment:", error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     // console.log(users)
//     return res.status(200).json({
//       users,
//       success: true
//     });
//   } catch (error) {
//     console.error("Error in getAllUsers:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.id
//     const user = await User.findById(userId)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       })
//     }
//     return res.status(200).json({
//       user,
//       success: true
//     })
//   } catch (error) {
//     console.error("Error in submitAssessment:", error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }

// export const deductToken = async (req, res) => {
//   try {
//     const UserId = req.id
//     // Find the employer's subscription
//     const employer = await User.findById(UserId);
//     if (!employer) {
//       return res.status(404).json({ success: false, message: "Employer not found" });
//     }

//     // Check if the employer has enough tokens
//     if (employer.subscription.tokensAvailable < 1) {
//       return res.status(400).json({ success: false, message: "Not enough tokens" });
//     }

//     // Deduct the token
//     employer.subscription.tokensAvailable -= 1;
//     employer.subscription.tokensConsumed += 1;

//     // Save the updated employer document
//     await employer.save();

//     res.status(200).json({ success: true, message: "Token deducted successfully" });
//   } catch (error) {
//     console.error("Error deducting token:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }

// //admin routes
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body)



//     if (email === process.env.ADMINEMAIL && password === process.env.ADMINPASSWORD) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24d" });

//       return res.status(200).cookie("token", token, { maxAge: 86400000, httpOnly: true, sameSite: "strict" }).json({
//         message: "Welcome back Admin",
//         token,
//         success: true
//       });
//     } else {
//       console.log(err)
//       return res.json({ success: false, message: 'error in Admin login api' })

//     }

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };





// export const saveOrUnsaveJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { jobId, action } = req.body;

//     if (!jobId || !action) {
//       return res.status(400).json({ success: false, message: "Job ID and action are required" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(jobId)) {
//       return res.status(400).json({ success: false, message: "Invalid Job ID" });
//     }

//     if (!['save', 'unsave'].includes(action)) {
//       return res.status(400).json({ success: false, message: "Invalid action" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: "Job not found" });
//     }

//     if (action === 'save') {
//       if (user.savedJobs.includes(jobId)) {
//         return res.status(400).json({ success: false, message: "Job is already saved" });
//       }
//       user.savedJobs.push(jobId);
//     } else {
//       user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
//     }

//     await user.save();
//     console.log(user)

//     return res.status(200).json({
//       success: true,
//       message: action === 'save' ? "Job saved successfully" : "Job unsaved successfully",
//       savedJobs: user.savedJobs
//     });
//   } catch (error) {
//     console.error("Error saving or unsaving job:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };



// export const checkJobSavedStatus = async (req, res) => {
//   try {
//     const userId = req.id; // Assuming you're storing user ID in the request after authentication
//     const { jobId } = req.params;

//     if (!jobId) {
//       return res.status(400).json({ success: false, message: "Job ID is required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const isSaved = user.savedJobs.includes(jobId);

//     return res.status(200).json({ success: true, isSaved });
//   } catch (error) {
//     console.error("Error checking job saved status:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


// // Get all saved jobs for the current user
// export const getSavedJobs = async (req, res) => {
//   try {
//     const userId = req.id;

//     const user = await User.findById(userId).populate({
//       path: 'savedJobs',
//       select: 'title location salary education description experienceLevel'
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, savedJobs: user.savedJobs || [] });
//   } catch (error) {
//     console.error("Error retrieving saved jobs:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };





import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { questionsByCategory } from "../utils/questions.js";
import nodemailer from "nodemailer"
import { Job } from '../models/job.model.js'
import mongoose from "mongoose";



// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// const sendOtp = async (email, otp) => {
//     const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: 'silkmuttu2003@gmail.com',
//             pass: 'xwcl ucrb agdq pwsn',
//         },
//     });

//     const mailOptions = {
//         from:'silkmuttu2003@gmail.com',
//         to: email,
//         subject: "Your OTP Code",
//         text:` Your OTP code is ${otp}. It is valid for 10 minutes`
//     }

//     await transporter.sendMail(mailOptions);
// };

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role, gender } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role || !gender) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email.", success: false });
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: "Phone number must be 10 digits .", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // const otpCode = generateOtp();
        // const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        // await sendOtp(email, otpCode);

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            gender,
            // otp: { code: otpCode, expiry: otpExpiry },
            profile: { profilePhoto: "" },
            status: role === 'Hr' ? 'pending' : 'approved',
        });

        await newUser.save();

          // Send email to HR user
          if (role === 'Hr') {
            await sendHrApprovalEmail(email); // Email HR user about pending approval
            await sendAdminApprovalRequest(email); // Email admin about the new HR user
        }


        return res.status(201).json({ 
            message: role === 'Hr' ? "User is registered. Please wait for admin approval." : "User is registered", 
            success: true 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// export const verifyOtp = async (req, res) => {





//   try {
//       const { email, otp } = req.body;
//       console.log("Request Body:", req.body);

//       if (!email || !otp) {
//           return res.status(400).json({ message: "Email and OTP are required.", success: false });
//       }

//       const user = await User.findOne({ email });

//       if (!user) {
//           return res.status(400).json({ message: "User not found.", success: false });
//       }

//       // Check if OTP is already verified
//       if (user.otp.verified) {
//           return res.status(400).json({ message: "OTP already verified.", success: false });
//       }

//       // Debugging logs to check OTP values
//       console.log("Stored OTP:", user.otp.code);
//       console.log("Entered OTP:", otp);
//       console.log("OTP Expiry:", user.otp.expiry);

//       // Validate OTP and expiry
//       if (user.otp.code !== otp || user.otp.expiry < new Date()) {
//           return res.status(400).json({ message: "Invalid or expired OTP.", success: false });
//       }

//       // Mark OTP as verified and save
//       user.otp.verified = true;
//       await user.save();

//       return res.status(200).json({ message: "OTP verified successfully. Registration complete.", success: true });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error", success: false });
//   }
// };




// hr approvel




// Send email to HR user upon sign-up






const sendHrApprovalEmail = async (email) => {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: "saisaikiran7890@gmail.com", // Your email
          pass: "jmof ildy dnxo grby", // Your email password
      },
  });

  const mailOptions = {
      from: "saisaikiran7890@gmail.com",
      to: email,
      subject: "Account Approval Pending",
      text: "Your account has been created, but it requires approval from an admin before you can log in.",
  };

  await transporter.sendMail(mailOptions);
};

// Send email to admin
const sendAdminApprovalRequest = async (email) => {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "saisaikiran7890@gmail.com", // Your email
        pass: "jmof ildy dnxo grby", // Your email password
      },
  });

  const mailOptions = {
      from: "saisaikiran7890@gmail.com",
      to: "saisaikiran7890@gmail.com", // Admin email
      subject: "New HR User Pending Approval",
      text: `A new HR user has registered with the email: ${email}. Please approve or reject this user.`,
  };

  await transporter.sendMail(mailOptions);
};





// Admin approves or rejects HR user
export const approveHrUser = async (req, res) => {
  try {
      const { userId, action } = req.body; // Action can be 'approve' or 'reject'
      console.log(req.body)

      if (!userId || !action) {
          return res.status(400).json({ success: false, message: "User ID and action are required." });
      }

      const user = await User.findById(userId);
      if (!user || user.role !== 'Hr') {
          return res.status(404).json({ success: false, message: "HR user not found." });
      }

      if (action === 'approve') {
          user.status = 'approved';

          // Send login credentials to HR user after approval
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
          const transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "saisaikiran7890@gmail.com", // Your email
                pass: "jmof ildy dnxo grby", // Your email password
              },
          });

          const mailOptions = {
              from: "saisaikiran7890@gmail.com",
              to: user.email,
              subject: "Account Approved",
              text: `Your account has been approved. You can now log in with the following credentials:\n\nEmail: ${user.email}\nPassword: Your password\n\nLogin link: [Your login link]`,
          };

          await transporter.sendMail(mailOptions);
      } else {
          user.status = 'rejected';
      }

      await user.save();

      return res.status(200).json({
          success: true,
          message: `HR user has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};











export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body)

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    let user = await User.findOne({ email });
    console.log(user,852)
    if (user.role === 'Hr') {
      if (user.status === 'pending') {
      return res.status(400).json({ message: "Your account is pending approval. Please wait for admin approval.", success: false });
      } else if (user.status === 'rejected') {
      return res.status(400).json({ message: "Your account has been rejected. You are not eligible to log in.", success: false });
      }
    }
    if (!user || !(await bcrypt.compare(password, user.password)) || role !== user.role) {
      return res.status(400).json({ message: "Incorrect email, password, or role.", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).cookie("token", token, { maxAge: 86400000, httpOnly: true, sameSite: "strict" }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      token,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body
    const resetToken = req.cookies?.token;
    console.log(req.body, resetToken)

    // Validate input
    if (!newPassword || !confirmPassword || !resetToken) {
      return res.status(400).json({ message: "All fields are required", success: false })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match", success: false })
    }

    // Verify the reset token
    let userId
    try {
      const decoded = jwt.verify(resetToken, process.env.SECRET_KEY)
      userId = decoded.userId
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired reset token", success: false })
    }

    // Find the user
    const user = await User.findById(userId)
    console.log(user,126)
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false })
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update the user's password
    user.password = hashedPassword
    await user.save()
    console.log(user,138)
    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", success: false })
  }
}



export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, housetype, hno, street, city, area, district, pincode, fathername, aaddharnum, languages, bio, skills, dateofbirth, maritalstatus, category, companydetails, technologyworked, companyaddress, zone, gst, pan, height, weight, Bloodgroup, Experiencelevel, directjob, trainingrequired, expectedsalary, negotiable, hrsatisfactory,hrusername,hremail} = req.body;

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found.", success: false });
    }

    user.profile = user.profile || {};
    user.personaldetails = user.personaldetails || {};
    user.workhistory = user.workhistory || { natureofwork: {} };
    user.PhysicalDetails = user.PhysicalDetails || {};
    user.addressdetails = user.addressdetails || {};
    user.hrexe = user.hrexe || {};
    user.education = user.education || {}



    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (housetype) user.addressdetails.housetype = housetype;
    if (hno) user.addressdetails.hno = hno;
    if (street) user.addressdetails.street = street;
    if (area) user.addressdetails.area = area;
    if (city) user.addressdetails.city = city;
    if (district) user.addressdetails.district = district;
    if (pincode) user.addressdetails.pincode = pincode;
    // personal details

    if (fathername) user.personaldetails.fathername = fathername
    if (aaddharnum) user.personaldetails.aaddharnum = aaddharnum
    if (dateofbirth) user.personaldetails.dateofbirth = dateofbirth
    if (Experiencelevel) user.Experiencelevel = Experiencelevel
    if (languages) user.languages = languages;
    if (companydetails) user.workhistory.natureofwork.companydetails = companydetails;
    if (companyaddress) user.workhistory.natureofwork.companyaddress = companyaddress;
    if (technologyworked) user.workhistory.technologyworked = technologyworked;

    if (zone) user.workhistory.natureofwork.zone = zone;
    if (req.body.education) {
      // Parse if education is a string (from FormData)
      let educationData = req.body.education;

      if (typeof educationData === 'string') {
        educationData = JSON.parse(educationData);
      }
      console.log(educationData)
      user.education = educationData
    }


    if (user.role === 'jobseeker') {
      // work history
      if (technologyworked) user.workhistory.technologyworked = technologyworked;
      if (companydetails) user.workhistory.natureofwork.companydetails = companydetails;
      if (companyaddress) user.workhistory.natureofwork.companyaddress = companyaddress;
      if (zone) user.workhistory.natureofwork.zone = zone;

      // physical details
      if (height) user.PhysicalDetails.height = height;
      if (weight) user.PhysicalDetails.weight = weight;
      if (Bloodgroup) user.PhysicalDetails.Bloodgroup = Bloodgroup;
      // Languages
      if (languages) user.languages = languages;
      if (Experiencelevel) user.Experiencelevel = Experiencelevel
      // hrexe

      if (directjob) user.hrexe.directjob = directjob
      if (trainingrequired) user.hrexe.trainingrequired = trainingrequired
      if (expectedsalary) user.hrexe.expectedsalary = expectedsalary
      if (negotiable) user.hrexe.negotiable = negotiable
      if (hrsatisfactory) user.hrexe.hrsatisfactory = hrsatisfactory
      if(hrusername) user.hrexe.hrusername = hrusername
      if(hremail)user.hrexe.hremail = hremail


    }

    // HR-specific fields
    if (user.role === "Hr" || user.role === "Employeer") {
      if (bio) user.profile.bio = bio;
      if (maritalstatus) user.profile.maritalstatus = maritalstatus;
      if (category) user.profile.category = category;
      if (gst) user.profile.gst = gst;
      if (pan) user.profile.pan = pan;
    }
    // Update skills only for jobseekers

    if (skills && user.role === "jobseeker") {
      user.profile.skills = skills.split(",");
    }

    // File upload for resume (if HR is uploading their resume)
    
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    } else {
      console.error("File upload failed: req.file is undefined");
    }
    console.log(user.profile.resume)

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAssessment = async (req, res) => {
  try {
    const userId = req.id
    console.log("Fetching assessment for user:", userId)

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Return the assessment data
    res.status(200).json({
      success: true,
      specialization: user.skillAssessment?.specialization || "",
      technical: user.skillAssessment?.technical || "",
      questions: user.skillAssessment?.questions || {
        "Personal / Psychology / Aptitude": [],
        Technical: [],
        "Professional / Responsibility": [],
      },
    })
  } catch (error) {
    console.error("Error in getAssessment:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

export const submitAssessment = async (req, res) => {
  try {
    const userId = req.id
    const { specialization, technical, questions } = req.body

    console.log("Submitting assessment for user:", userId)
    console.log("Assessment data:", { specialization, technical, questions })

    if (!specialization || !technical || !questions) {
      return res.status(400).json({
        success: false,
        message: "Missing required assessment data",
      })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Update the skill assessment
    user.skillAssessment = {
      specialization,
      technical,
      questions: {
        "Personal / Psychology / Aptitude": questions["Personal / Psychology / Aptitude"],
        Technical: questions["Technical"],
        "Professional / Responsibility": questions["Professional / Responsibility"],
      },
    }

    await user.save()
    console.log("Assessment saved successfully")

    res.status(200).json({
      success: true,
      message: "Assessment submitted successfully",
    })
  } catch (error) {
    console.error("Error in submitAssessment:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

export const getJobSeekerUsers = async (req, res) => {
  try {
    const query = {
      role: "jobseeker"
    }
    const user = await User.find(query)
    return res.status(200).json({
      user,
      success: true
    })
  } catch (error) {
    console.error("Error in submitAssessment:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users)
    return res.status(200).json({
      users,
      success: true
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const getHrUsers = async (req, res) => {
  try {
    const hrUsers = await User.find({ role: 'Hr' }).select('fullname email gender status phonenumber');
    return res.status(200).json({
      hrUsers,
      success: true
    });
  } catch (error) {
    console.error("Error in getHrUsers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    return res.status(200).json({
      user,
      success: true
    })
  } catch (error) {
    console.error("Error in submitAssessment:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

export const deductToken = async (req, res) => {
  try {
    const UserId = req.id
    // Find the employer's subscription
    const employer = await User.findById(UserId);
    if (!employer) {
      return res.status(404).json({ success: false, message: "Employer not found" });
    }

    // Check if the employer has enough tokens
    if (employer.subscription.tokensAvailable < 1) {
      return res.status(400).json({ success: false, message: "Not enough tokens" });
    }

    // Deduct the token
    employer.subscription.tokensAvailable -= 1;
    employer.subscription.tokensConsumed += 1;

    // Save the updated employer document
    await employer.save();

    res.status(200).json({ success: true, message: "Token deducted successfully" });
  } catch (error) {
    console.error("Error deducting token:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//admin routes
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)



    if (email === process.env.ADMINEMAIL && password === process.env.ADMINPASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24d" });

      return res.status(200).cookie("token", token, { maxAge: 86400000, httpOnly: true, sameSite: "strict" }).json({
        message: "Welcome back Admin",
        token,
        success: true
      });
    } else {
      console.log(err)
      return res.json({ success: false, message: 'error in Admin login api' })

    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};





  export const saveOrUnsaveJob = async (req, res) => {
    try {
      const userId = req.id;
      const { jobId, action } = req.body;
      console.log(req.body)
  
      if (!jobId || !action) {
        return res.status(400).json({ success: false, message: "Job ID and action are required" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ success: false, message: "Invalid Job ID" });
      }
  
      if (!['save', 'unsave'].includes(action)) {
        return res.status(400).json({ success: false, message: "Invalid action" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
  
      if (action === 'save') {
        if (user.savedJobs.includes(jobId)) {
          return res.status(400).json({ success: false, message: "Job is already saved" });
        }
        user.savedJobs.push(jobId);
      } else {
        user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
      }
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: action === 'save' ? "Job saved successfully" : "Job unsaved successfully",
        savedJobs: user.savedJobs
      });
    } catch (error) {
      console.error("Error saving or unsaving job:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  


export const checkJobSavedStatus = async (req, res) => {
  try {
    const userId = req.id; // Assuming you're storing user ID in the request after authentication
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ success: false, message: "Job ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isSaved = user.savedJobs.includes(jobId);

    return res.status(200).json({ success: true, isSaved });
  } catch (error) {
    console.error("Error checking job saved status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Get all saved jobs for the current user
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id; 

    const user = await User.findById(userId).populate({
      path: 'savedJobs',
      select: 'title location salary education description experienceLevel'
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, savedJobs: user.savedJobs || [] });
  } catch (error) {
    console.error("Error retrieving saved jobs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};






