
const mongoose=require('mongoose');

const adminSchema= new mongoose.Schema(
    {
   
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }, 
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
       
    }
    // {
    //     timestamps:true,
    // }
)

const Admin=mongoose.model('User',adminSchema);

module.exports=Admin;
