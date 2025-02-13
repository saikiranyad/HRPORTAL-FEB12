





// import express from "express";
// import { login, logout, register, updateProfile,submitAssessment, getAssessment, getJobSeekerUsers,getCurrentUser,deductToken,
//      adminLogin,
//      getAllUsers,
    
//      getSavedJobs,
//      saveOrUnsaveJob,
//      checkJobSavedStatus,
//      } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/mutler.js";
// // import Adminauth from "../middlewares/Adminauth.js";    
// // import {approvePayment} from "../controllers/employer.controller.js";

// import { submitPayment, getSubscription, getPayments, getAllsubscriptions, getAllPayments, approvePayment, handlePayment } from "../controllers/employer.controller.js"
 
// const router = express.Router();

// router.route("/register").post(singleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
// router.route('/getAllUsers').get(getAllUsers)
// router.route("/assessment").get(isAuthenticated, getAssessment)
// router.route("/assessment/submit").post(isAuthenticated, submitAssessment);
// router.route("/getJobSeekerUsers").get(getJobSeekerUsers)
// router.route("/getCurrentUser").get(isAuthenticated, getCurrentUser)
// // router.route("/getCurrentUser").get(Adminauth, getCurrentUser)
// router.post("/payment", isAuthenticated, submitPayment)
// router.get("/subscription", isAuthenticated, getSubscription)
// router.post('/deductToken',isAuthenticated,deductToken)

// // admin routes
// router.post('/submitPayment',isAuthenticated,submitPayment)
// router.route('/adminlogin').post(adminLogin);
// router.get('/approvedPayment',approvePayment)
// router.get('/pendingPayment, isAuthenticated, getPendingPayment')
// router.route("/getPayments").get(getPayments)
// router.route("/getallPayments").get(getAllPayments)
// router.route("/getallsubscriptions").get(getAllsubscriptions)
// router.route('/handlepayment').post(handlePayment)
// router.put("/save-or-unsave", isAuthenticated, saveOrUnsaveJob);
// router.get("/check-job-saved/:jobId", isAuthenticated, checkJobSavedStatus);

// router.get("/saved", isAuthenticated, getSavedJobs);


// export default router;










import express from "express";
import { login, logout, register, updateProfile,submitAssessment, getAssessment, getJobSeekerUsers,getCurrentUser,deductToken,
     adminLogin,
     getAllUsers,
    
     getSavedJobs,
     saveOrUnsaveJob,
     checkJobSavedStatus,
     approveHrUser,
     getHrUsers,
     resetPassword,
     // verifyOtp,
     } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
// import Adminauth from "../middlewares/Adminauth.js";    
// import {approvePayment} from "../controllers/employer.controller.js";

import { submitPayment, getSubscription, getPayments, getAllsubscriptions, getAllPayments, approvePayment, handlePayment } from "../controllers/employer.controller.js"
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route('/getAllUsers').get(getAllUsers)
router.route("/assessment").get(isAuthenticated, getAssessment)
router.route("/assessment/submit").post(isAuthenticated, submitAssessment);
router.route("/getJobSeekerUsers").get(getJobSeekerUsers)
router.route("/getCurrentUser").get(isAuthenticated, getCurrentUser)
// router.route("/getCurrentUser").get(Adminauth, getCurrentUser)
router.post("/payment", isAuthenticated, submitPayment)
router.get("/subscription", isAuthenticated, getSubscription)
router.post('/deductToken',isAuthenticated,deductToken)

// admin routes
router.post('/submitPayment',isAuthenticated,submitPayment)
router.route('/adminlogin').post(adminLogin);
router.get('/approvedPayment',approvePayment)
// router.get('/pendingPayment', isAuthenticated, getPendingPayment)
router.route("/getPayments").get(getPayments)
router.route("/getallPayments").get(getAllPayments)
router.route("/getallsubscriptions").get(getAllsubscriptions)
router.route('/handlepayment').post(handlePayment)
router.put("/save-or-unsave", isAuthenticated, saveOrUnsaveJob);
router.get("/check-job-saved/:jobId", isAuthenticated, checkJobSavedStatus);

router.get("/saved", isAuthenticated, getSavedJobs);
// router.route("/verifyOtp").post(verifyOtp);
router.post("/approve-hr", approveHrUser);
router.get("/gethrusers",getHrUsers)
router.route("/reset-password").post(isAuthenticated,resetPassword)


export default router;



