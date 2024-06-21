import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FinalLogo from '../assets/finalLogo.png';
import Footer from "../components/Footer";
import { URL } from '../url';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <>
      <style>{`
        .navbar {
          background: linear-gradient(to right, #ffc300, #ff7b00);
          z-index: 11;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          padding: 1rem;
        }

        .title {
          font-size: 2rem;
          text-decoration: none;
          color: black;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          transition: all ease 0.3s;
          text-shadow: 5px 5px 6px rgba(0, 0, 0, 0.3);
        }

        .title:hover {
          text-decoration: none;
          // letter-spacing: 0.3rem;
          color: black;
          scale: 1.02;
        }

        nav ul {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
        }

        nav ul li {
          list-style: none;
          margin: 0 10px;
        }

        nav ul li a {
          color: black;
          text-decoration: none;
          font-size: 18px;
          position: relative;
        }

        nav ul li a:hover {
          color: #000000;
        }

        nav ul li a::after {
          content: '';
          width: 0%;
          height: 3px;
          background: black;
          position: absolute;
          left: 0;
          bottom: -6px;
          transition: 0.5s;
        }

        nav ul li a:hover::after {
          width: 100%;
        }

        .logo {
          margin-right: 2rem;
          width: 6%;
          height: auto;
          cursor: pointer;
        }
      `}</style>
      
      <nav className="navbar">
        <div className="flex items-center">
          <img src={FinalLogo} alt='...' className="logo" />
          <Link to='/' className="title">Exploring Ramayana: Blogs </Link>
        </div>
        
        <div>
          <ul>
            <li><Link to="#highlights">Highlights</Link></li>
            <li><Link to="#about">About</Link></li>
            <li><Link to="/repository">Library</Link></li>
            <li><Link to="#">Blogs</Link></li>
            <li><Link to="#">Chatbot</Link></li>
          </ul>
        </div>
      </nav>

      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
          <input onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
          <button onClick={handleRegister} className="w-full px-2 py-2 text-lg font-bold bg-[#ff6337] rounded-lg text-black border border-black font-semibold hover:bg-[#f96d00] hover:text-black transform transition-transform hover:scale-105">Register</button>
          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
