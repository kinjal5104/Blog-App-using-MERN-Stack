
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import {ImCross} from 'react-icons/im'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'

const CreatePost = () => {
   
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    // const [cat,setCat]=useState("")
    // const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const handleCreate=async (e)=>{
        e.preventDefault() //prevents auto refresh
        const post={
          title,
          desc,
          username:user.username,
          userId:user._id,
        }
        
        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          console.log(data)
          //img upload


          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
            console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
        // console.log(post)
        try{
          const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)

        }
        catch(err){
          console.log(err)
        }
    }



  return (
    <div>
    <Navbar/>
    <div className='px-6 md:px-[200px] mt-8'>
    <h1 className='font-bold md:text-2xl text-xl '>Create a post</h1>
    <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
      <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title' className='border-2 border-black rounded-lg px-4 py-2 outline-none ' maxLength={70} required/>
      <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
      <textarea onChange={(e)=>setDesc(e.target.value)} rows={8} cols={30} className='border-2 border-black rounded-lg px-4 py-2 outline-none' placeholder='Enter post description' maxLength={5000} required/>
      <button onClick={handleCreate} className='bg-[#ff6337] rounded-lg w-full md:w-[20%] mx-auto text-black border border-black font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
    </form>

    </div>
    <Footer/>
</div>
  )
}

export default CreatePost;