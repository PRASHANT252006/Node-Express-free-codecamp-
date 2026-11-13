const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Please provide price"],
        min:0
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    company:{
        type:String,
        enum:{
            values:["ikea","liddy","marcos",'caressa'],
            message:"{VALUE} is not supported"
        }
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Product",productSchema)