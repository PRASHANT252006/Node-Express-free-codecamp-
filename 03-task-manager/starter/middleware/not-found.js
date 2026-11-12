const notfound=(req,res)=>{
    res.status(404).json({msg:`Route ${req.originalUrl} not found`})
}
module.exports=notfound;

// The rule again for next time: Middleware that only does work (logger, auth check): call next(). Middleware that ends the request (controller, notfound): send the response, no next()

// Middleware that only does work (logger, auth check): call next().
// Middleware that ends the request (controller, notfound): send the response, no next()