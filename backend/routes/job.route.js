// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { deleteJobById, editJobById, getAdminJobs, getAllJobs, getJobById, getJobBySpecificId, postJob } from "../controllers/job.controller.js";

// const router = express.Router();

// router.route("/post").post(isAuthenticated, postJob);
// router.route("/get").get(isAuthenticated, getAllJobs);
// router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// router.route("/get/:id").get(isAuthenticated, getJobById);
// router.route("/getjobid/:id").get(isAuthenticated,getJobBySpecificId)
// router.route("/jobedit/:id").put(isAuthenticated, editJobById);
// router.route('/delete/:id').delete(isAuthenticated,deleteJobById)

// export default router;




import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJobById, editJobById, getAdminJobs, getAllJobs, getJobById, getJobBySpecificId, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getjobid/:id").get(isAuthenticated,getJobBySpecificId)
router.route("/jobedit/:id").put(isAuthenticated, editJobById);
router.route('/delete/:id').delete(isAuthenticated,deleteJobById)

export default router;


