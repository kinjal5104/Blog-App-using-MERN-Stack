import { IF } from '../url';

const HomePosts = ({ post }) => {
  // Check if post is null or undefined
  if (!post) {
    // Render null or handle the absence of post data
    return null;
  }

  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[250px] px-90 flex justify-center items-center">
        {/* Check if post.photo is defined before rendering */}
        {post.photo && (
          <img
            src={IF + post.photo}
            alt="Ram"
            className="h-full object-cover border-4 border-black rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          />
        )}
      </div>

      {/* horizontal space */}
      <div className="w-4"></div>

      {/* right */}
      <div className="flex flex-col w-[60%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl mt-2 hover:text-gray-500 hover:scale-105 transition duration-300 ease-in-out">
  {post.title}
</h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>

          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        {/* Container for post description */}
        <p className="text-sm md:text-lg text-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
  {post.desc.slice(0, 200)} ...Read more
</p>

      </div>
    </div>
  );
};

export default HomePosts;
