const{CustomAPIError}=require('./custom-error.js');
const {BadRequest}=require('./bad-request.js');
const {Unauthenticated}=require('./unauthenticated.js');
const NotFoundError=require('./not-found.js');
module.exports={CustomAPIError,BadRequest,Unauthenticated,NotFoundError};