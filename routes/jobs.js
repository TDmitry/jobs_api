import express from 'express';
import { getAllJobs, getSingleJob, createJob, updateJob, deleteJob } from '../controllers/jobs.js';

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob);

export default router;