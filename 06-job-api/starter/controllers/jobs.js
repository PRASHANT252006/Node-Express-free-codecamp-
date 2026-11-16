const Job=require('../models/job.js')
const {StatusCodes}=require('http-status-codes')
const {BadRequest}=require('../error')
const NotFoundError=require('../error/not-found.js')
const getAllJob = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.id }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length },{size:job.length});
};
const createJob=async(req,res)=>
{
    const createdBy=req.user.id;
    const job=await Job.create({createdBy,...req.body});
    res.status(StatusCodes.CREATED).json({jobs:job});
}
const updateJob=async(req,res)=>
{
    const {id:job_id}=req.params;
    if(!job_id){
        throw new BadRequest('Please provide job id');
    }
    const job=await Job.findOneAndUpdate({_id:job_id,createdBy:req.user.id},req.body,{new:true,runValidators:true});
    if(!job)
    {
        throw new NotFoundError(`No job with id ${job_id}`);
    }
    res.status(StatusCodes.OK).json({jobs:job});
}
const deleteJob = async (req, res) => {
    const { id: job_id } = req.params;

    const job = await Job.findOneAndDelete({ _id: job_id, createdBy: req.user.id });

    if (!job) {
        throw new NotFoundError(`No job with id ${job_id}`);
    }

    res.status(StatusCodes.OK).json({ msg: 'Job deleted' ,job});
};
const getjob=async(req,res)=>{
    const {user}=req.user.id;
    const {id}=req.params;
const job=await Job.findOne({_id:id,createdBy:user});
if(!job)
{
    throw new NotFoundError(`No job with id ${id}`);
        
}
res.status(StatusCodes.OK).json({jobs:job});
}

module.exports={
    getAllJob,createJob,updateJob,deleteJob,getjob
}