const express = require('express');
const router = express.Router();
const Post = require('../config/db');

// Route handler for displaying all posts with pagination
router.get('', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        const data = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

        res.render('index', {
            title: "NodeJs Blogs",
            description: "Simple Blogs Created with Nodejs",
            data: data,
            currentPage: page,
            totalPages: totalPages
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});




router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Simple Blogs Created with Nodejs"
        };

        res.render('post', { locals, data });

    } catch (error) {
        console.log(error);
    }
});

//search 

router.post('/search' , async(req,res)=>{
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
        }).sort({createdAt:-1});
        res.render('search',{locals,data});
    }catch(error){
        console.log(error);
    }
})




// function insertPost (){
//     Post.insertMany([
//         {
//             title:"title1",
//             description:"new desc1",
//             image:"abd"
//         },
//         {
//             title:"title2",
//             description:"new desc2",
//             image:"abd"
//         },
//         {
//             title:"title3",
//             description:"new desc3",
//             image:"abd"
//         },
//         {
//             title:"title4",
//             description:"new desc4",
//             image:"abd"
//         }

//     ])
// }

// insertPost();
// // router.get('/about',(req,res) =>{
// //     const locals={
// //         title:"NodeJs Blogs",
// //         description:"Simple Blogs Created with Nodejs"
// //     }
 

// //     res.render('about',{locals});
// // })
  
module.exports = router; 

