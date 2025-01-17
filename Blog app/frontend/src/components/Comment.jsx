import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { URL } from '../url'
// import { BiEdit } from 'react-icons/bi'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Comment=({c,post}) =>{

    const {user}=useContext(UserContext)
  const deleteComment=async(id)=>{

      try{
           await axios.delete(URL+"/api/comments/"+id, {withCredentials:true})
           window.location.reload(true) //for reloding after deleting comment
        }
       catch(err)
         {
                console.log(err)   
             }   

}

// console.log(post.userId)
// console.log(user._id)

    return(
        <div className="px-2 py-2 bg-[#fbf2d5] rounded-lg mt-2">
        <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
        <div className="flex space-x-2">
       <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
       </div>
       {user?._id===c?.userId? <div className="flex items-center justify-center space-x-2">
      <p  className="cursor-pointer" onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                </div>:" "}
            
        </div>
        </div>
        <p className="px-4 mt-2">{c.comment}</p>
     </div>
    )
}
export default Comment