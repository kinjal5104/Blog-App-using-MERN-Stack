

require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const cookieParser=require('cookie-parser');
const mongoStore=require('connect-mongo');
const expressLayout=require('express-ejs-layouts');
const methodOverride = require('method-override');
const multer=require('multer');

const app=express();
app.use(methodOverride('_method'));
const { MongoClient } = require('mongodb');

const port = 8000;


const connectDB=require('./server/config/db');
const session = require('express-session');

connectDB();
 

app.use(express.static('public'));   //This line serves static files from the "public" directory. When a request is made for a file, Express will check if it exists in the specified directory and serve it if found.

 
//templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
// app.set('layout','./layouts/Century')
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static('uploads'));
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:mongoStore.create({
        mongoUrl:'mongodb+srv://kinjalpatel:kinjal5104@cluster0.0toseml.mongodb.net/Admin_Details'
    })
}))
mongoose
.connect('mongodb+srv://kinjalpatel:kinjal5104@cluster0.0toseml.mongodb.net/Painting_Details')
.then( ()=> {
    console.log("connected to mongodb"); 
    app.listen(port,()=>{
        console.log(`server started in port ${port}`);
    });
}).catch((error)=>{
    console.log(error);
}); 


// app.get('/admin',  (req, res) => {
//     // Check if user is authenticated and their role
//     const isAdmin = req.user.role === 'admin';

//     // Render different layouts based on user role
//     if (isAdmin) {
//         res.render('index', { layout: 'main' }); // Render admin layout
//     } else {
//         res.render('dashboard', { layout: 'main_layout' }); // Render main layout
//     }
// });

app.use('/repository',require('./server/routes/main'));
app.use('/admin',require('./server/routes/admin_routes'));
 
// app.use('/admin',require('./server/routes/admin'));
// app.use('/admin/addBefore17thCen',require('./server/routes/addBefore17thCen'))
// app.use('/admin/addPost',require('./server/routes/admin_routes')) 
// app.use('/adminAccess',require('./server/routes/adminAccess')) 
  











