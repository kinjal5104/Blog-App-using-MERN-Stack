import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import { UserContext } from "../context/UserContext"
import { IF, URL } from "../url"

const PostDetails = () => {
  const postId = useParams().id
  const [post, setPost] = useState({})
  const { user } = useContext(UserContext)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId)
      setPost(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true })
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPostComments = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId)
      setComments(res.data)
      setLoader(false)
    } catch (err) {
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPostComments()
  }, [postId])

  const postComment = async (e) => {
    e.preventDefault()
    try {
      await axios.post(URL + "/api/comments/create", {
        comment: comment,
        author: user.username,
        postId: postId,
        userId: user._id
      }, { withCredentials: true })

      fetchPostComments()
      setComment("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full"><Loader /></div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl  transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)}><BiEdit /></p>
                <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
          </div>
          <div className="flex justify-end text-gray-500 font-semibold space-x-2 text-sm ">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
          <div>
  <img  src={IF + post.photo}  className="w-full mx-auto mt-8 rounded-lg border-2 border-black transform hover:scale-105 transition duration-300 ease-in-out hover:opacity-90"  style={{ width: '50%', height: '50%', marginBottom: '30px' }}  alt="Ram" /> 
 
         
  {/* Show only 10 rows of description */}
  <div style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '5px'}}>
  <div style={{maxHeight: '20em', overflowY: 'auto', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2) ', transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)', border: '2px solid transparent', borderRadius: '5px', padding: '10px', cursor: 'pointer'}} >      <p>{post.desc}</p>
    </div>
  </div>
</div>
          <div className="flex items-center mt-8 space-x-4 font-semibold"></div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* Write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[60%] outline-none py-2 px-4 mt-4 md:mt-0 border border-black rounded-lg mb-2 md:mb-0 md:mr-2" />
            <button onClick={postComment} className="bg-[#ff6337] rounded-lg  text-black border border-black font-semibold text-sm px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default PostDetails
