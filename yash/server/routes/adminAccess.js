const express=require('express');
const bodyParser=require('body-parser');
const router = express.Router();

router.post('/', async(req,res)=>{
    res.render('adminAccess');
})

module.exports=router;