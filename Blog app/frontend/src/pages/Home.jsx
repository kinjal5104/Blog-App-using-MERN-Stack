import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Loader from '../components/Loader';
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      const reversedPosts = res.data.reverse(); // Reverse the order of fetched posts
      const totalPostsCount = reversedPosts.length;
      const totalPagesCount = Math.ceil(totalPostsCount / 3);
      setTotalPages(totalPagesCount);
      setTotalPosts(totalPostsCount);
      const startIndex = (currentPage - 1) * 3;
      const endIndex = Math.min(startIndex + 3, totalPostsCount);
      setPosts([...reversedPosts.slice(startIndex, endIndex)]);
      setNoResults(totalPostsCount === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Total Posts: {totalPosts}
          </h2>
          <div className="flex items-center space-x-4">
            {currentPage > 1 && (
              <button className="text-2xl" onClick={handlePrevPage}>
                &lt;&lt;
              </button>
            )}
            <h4 className="text-2xl font-bold">
              {Math.min(currentPage * 3, totalPosts)} / {totalPosts}
            </h4>
            {currentPage < totalPages && (
              <button className="text-2xl" onClick={handleNextPage}>
                &gt;&gt;
              </button>
            )}
          </div>
        </div>

        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={`/posts/post/${post._id}`}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
