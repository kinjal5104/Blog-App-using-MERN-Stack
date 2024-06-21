const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token //Extracts the JWT from the token cookie in the request.
    // console.log(token)
    // if(!token){
    //     return res.status(401).json("You are not authenticated!")
    // }
    jwt.verify(token,process.env.SECRET,async (err,data)=>{
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        
        req.userId=data._id
       
        // console.log("passed")
        
        next()  // Calls the next middleware function in the stack. This allows the request to proceed to the next middleware or route handler.
    })
}

module.exports=verifyToken