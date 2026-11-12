const Task=require('../models/Task.js')
const asyncWrapper=require('../middleware/async.js')
const {createCustomError}=require('../errors/custom-error.js') 

const getAllTasks=asyncWrapper(async(req,res)=>{
  const tasks=await Task.find({});
//Task.find() always returns an array, even if only one task is found or none is found
  res.status(200).json({tasks})
})

const createTask=asyncWrapper(async (req,res)=>{
 const task=await Task.create(req.body);
    res.status(201).json({task})
})

const getTask=asyncWrapper(async (req,res,next)=>{
   
      const {id:taskID}=req.params;
        const task=await Task.findOne({_id:taskID});
      if(!task){
        //new Error() is a built-in JS class
      //   const error=new Error(`No task with id ${taskID}`);
      //  error.status=404;
       return next(createCustomError(`No task with id ${taskID}`,404));
        // return res.status(404).json({msg:`No task with id ${taskID}`})
      }  
      res.status(200).json({task})
})
const updateTask=asyncWrapper(async (req,res)=>{
   
        const {id:taskID}=req.params;
        // const {name}=req.body;
        // const task=await Task.findOne({_id:taskID});
        // task.name=name;
        // await task.save();
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{returnDocument:'after',runValidators:true});
       if(!task){
        return res.status(404).json({msg:`No task with id ${taskID}`})
      }
        res.status(200).json({task});
    })
const deleteTask=asyncWrapper(async (req,res)=>{
   
        const {id:taskID}=req.params;
         const task=await Task.findOneAndDelete({_id:taskID});
        if(!task){
    return res.status(404).json({msg:`No task with id ${taskID}`})
}
         res.status(200).json({task});
    })



module.exports={
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
    getTask
}