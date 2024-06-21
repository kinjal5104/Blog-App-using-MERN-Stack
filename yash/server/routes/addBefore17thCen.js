const express=require('express');
const bodyParser=require('body-parser');
const router = express.Router();
const Data=require('../config/db')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/' ,(req,res) =>{
    res.send('you are at adminPost page')
})
 
//Routes
router.post('/',async(req,res)  =>{
    //create data
    try{
        const data=await Data.create(req.body)
        console.log(req.body);
        console.log(data);
        res.status(200).json(data);
    }catch(error){ 
        console.log(error.message);
    }

}) 



 
module.exports = router; 