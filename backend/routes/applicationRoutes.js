import express from "express";
import {
    employerGetAllApplications,
    jobseekerGetAllApplications,
    jobseekerDeleteApplication,
    postApplication,

} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.post("/post", isAuthenticated, postApplication);
router.get("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

export default router;