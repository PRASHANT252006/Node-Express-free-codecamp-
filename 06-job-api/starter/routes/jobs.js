const express=require('express');
const router=express.Router();
const {getAllJob,createJob,updateJob,deleteJob,getjob}=require("../controllers/jobs.js")
router.post('/',createJob);
router.get('/',getAllJob);
router.patch('/:id',updateJob);
router.delete('/:id',deleteJob);
router.get('/:id',getjob);

module.exports=router;