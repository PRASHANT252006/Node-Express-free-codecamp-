const notfound=(req,res)=>{
    res.status(404).send(`No such route is present ${req.url}`)
}
module.exports=notfound;