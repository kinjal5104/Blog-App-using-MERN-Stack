
const mongoose=require('mongoose');

const dataSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            // required:true,
        },
        description:{
            type:String,
            // require:true,
        }, 
        postImage:{
            type:String,
            // require:true,
        }, 
        // image:Buffer,
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

const Data=mongoose.model('Data',dataSchema);

module.exports=Data;
