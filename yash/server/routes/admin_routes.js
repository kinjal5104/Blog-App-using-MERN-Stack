const express=require('express');
const router = express.Router();

const Post=require('../config/db');
const User=require('../config/admin');
const multer=require('multer');

// const upload=multer({dest:'uploads/',limits: { fileSize: 10 * 1024 * 1024 }})
// const upload = multer({ storage: storage });
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const adminLayout='../views/layouts/admin';
const showPostLayout='../views/layouts/showPost';
const navBarLayout='../views/layouts/navBar';

const jwtSecret='MySecretePost';


const storage =multer.diskStorage({
    destination:function (req,file,cb) {
        console.log('inside the destination of storage')
        return cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        console.log('inside the filename of storage')
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
});
const upload=multer({storage})
router.post('/register',async(req,res)=>{
    
    try{
    const {username,password}=req.body;

    const hashedPassword=await bcrypt.hash(password,10);
    try{
        const user=await User.create({username,password:hashedPassword});
        res.status(201).json({message:'user created',user});
    }catch(err){
        if(err.code===11000){

            res.status(409).json({message:'user alreqady in use'})
        }
    }
    res.status(500).json({messag:"Internal server error"})
}catch(err){
    console.log(err);
}


        
})


// check login

const authMiddleware=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,jwtSecret);
        req.userId=decoded.userId;
        next();

    }catch(error){
        res.status(401).json({messag:'unauthorized'});
    }
}



// GET
// ADMIN LOG IN PAGE
// rendering log in page
router.get('/',  async(req,res) =>
{
  
    try{
        const locals={
            title:"admin",
            description:"simple blog"
        }
        const data=await Post.find();
        res.render('admin/index',{locals,layout:navBarLayout});

    }catch(error){
        console.log(error);
    }
})




// post
// admin check login
// after authorizing rendering admin access page
router.post('/',async(req,res) =>
{
  
    try{
        
        const {username,password}=req.body;
        
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({message:'invalid credential'});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:'invalid credential'});
        }
        const token=jwt.sign({userId:user._id},jwtSecret)
        res.cookie('token',token,{httpOnly:true});
        res.redirect('/admin/admin_dashboard');
    }catch(error){
        console.log(error);
    }
})


router.get('/admin_dashboard',authMiddleware, async(req,res)=>{

    try{
        const locals={
            title:'Dashboard',
            description:'this is the admin dashboard'
        }
        const data = await Post.find().sort({ createdAt: -1 });

        res.render('admin/admin_dashboard',{
            locals,
            data,
            layout:adminLayout
        });
    }catch(err){
        console.log(err);
    }


})

// in adminAccess page ==>after clicking the create button
router.get('/addPost', authMiddleware, async(req,res) =>
{
  
    try{
        const locals={
            title:"admin",
            description:"simple blog"
        }
        const toastMessage=''
        const data = await Post.find().sort({ createdAt: -1 });
        res.render('admin/addPost',{locals, layout:showPostLayout, data,toastMessage});

    }catch(error){
        console.log(error); 
    }
})
 

//after filling the new data form

//create data
router.post("/addPost", authMiddleware,upload.single('postImage'), async (req,res)=>{
    try{
        const toastMessage = 'Data created successfully';
        const data={
            title:req.body.title,
            description:req.body.description,
            postImage:req.file.path
        }
        console.log(data.postImage)
        console.log(req.body)
        console.log(data)
        // const data=await Post.create(req.body)
        await Post.create(data);
        res.render('admin/addPost',{toastMessage, layout:showPostLayout})
        
        // res.status(200).json({data,toastMessage:'Data created successfully'});
        
    }catch(error){
        console.log(error.message); 
    }
})
 
//update data request


router.get("/editPost/:id",authMiddleware, async (req,res)=>{
    try{
        console.log('inside edit get get method');
        const data=await Post.findOne({_id:req.params.id});
        res.render(`admin/editPost`,{
            data,
            layout:adminLayout
        });
      
        
    }catch(error){
        console.log(error.message);
    }
})

//actual updating the post

router.put("/editPost/:id",authMiddleware, async (req,res)=>{
    try{
        console.log('inside edit put put method');
       await Post.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            description:req.body.description,
            updatedAt:Date.now()
        });
        res.redirect(302,`/admin/editPost/${req.params.id}`);
      
        
    }catch(error){
        console.log(error.message);
    }
})





router.delete('/deletePost/:id', authMiddleware, async(req,res)=>{
    try{
        console.log('in /deletePost/:id')
        const result=await Post.deleteOne({ _id: req.params.id } );

        if (!result) {
            return res.status(404).json({ message: 'Document not found' });
        }
        const toastMessage='Document deleted successfully'
        res.redirect(302,'/admin/admin_dashboard');

    }catch(error) 
    {
        console.log(error)
    }
})



router.post('/admin_dashboard/search' ,authMiddleware, async(req,res)=>{
    try{

        const locals={
            title:"Search",
            decription:"simple blogs"
        } 
        let searchterm=req.body.searchTerm;
        const searchNospecialCharacter= searchterm.replace(/(^a-zA-Z0-9)/g,"");
        console.log(searchterm)
        const data=await Post.find({
            $or:[
                 {title:{$regex:new RegExp(searchNospecialCharacter,'i')}},
                {descriptione:{$regex:new RegExp(searchNospecialCharacter,'i')}}
            ]
        }).sort({ createdAt: -1 });
        res.render('admin/admin_search',{locals,data, layout:adminLayout});
    }catch(error){
        console.log(error);
    }
})

router.get('/showPost/:id', authMiddleware, async(req,res)=>{
    try{
        let slug=req.params.id;
        const data=await Post.findById({_id: slug});
        res.render('admin/showPost',{data, layout:showPostLayout});
    }catch(err){
        console.log(err);
    } 
})


//get
//admin logout
router.get('/logout', (req,res) =>{
    
    res.clearCookie('token');
   
    // res.json({message:'logout successfully'});
    res.redirect('/admin')
})

module.exports = router; 