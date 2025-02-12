// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
// import { singleUpload } from "../middlewares/mutler.js";

// const router = express.Router();

// router.route("/register").post(isAuthenticated,registerCompany);
// router.route("/get").get(isAuthenticated,getCompany);
// router.route("/get/:id").get(isAuthenticated,getCompanyById);
// router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

// export default router;



// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { deleteCompany, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
// import { singleUpload } from "../middlewares/mutler.js";

// const router = express.Router();

// router.route("/register").post(isAuthenticated,registerCompany);
// router.route("/get").get(isAuthenticated,getCompany);
// router.route("/get/:id").get(isAuthenticated,getCompanyById);
// router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
// router.route("/delete/:id").delete(isAuthenticated,deleteCompany);

// export default router;


import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// Middleware to check admin role
import {
  deleteCompany,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
  approveCompany,
  getAllCompanies,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";
import Adminauth from "../middlewares/Adminauth.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);
router.route("/getallcompanies").get(getAllCompanies);

// New route for admin to approve or reject companies
router.route("/approve/:id").put(approveCompany);



export default router;


