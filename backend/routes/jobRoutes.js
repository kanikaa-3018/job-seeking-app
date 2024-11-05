import express from "express";
import {
    getAllJobs,
    deleteJob,
    getMyJobs,
    getSingleJob,
    postJob,
    updateJob,
} from "../controllers/jobController.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post",isAuthenticated, postJob);
router.get("/getmyjobs",isAuthenticated, getMyJobs);
router.get("/:id",isAuthenticated, getSingleJob);
router.put("/update/:id", updateJob);
router.delete("/delete/:id", deleteJob);

export default router;