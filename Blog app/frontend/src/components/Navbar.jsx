import { useContext, useState } from "react";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import FinalLogo from '../assets/finalLogo.png';
import { UserContext } from "../context/UserContext";
import Menu from "./Menu";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(prompt ? `?search=${prompt}` : "/");
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
          // position: fixed;
          width: 100%;
          top: 0;
          left: 0;
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
        .login-button,
        .register-button {
          display: inline-block;
          padding: 5px 10px;
          border: 2px solid #000;
          border-radius: 5px;
          text-decoration: none;
          color: #000;
          transition: background-color 0.3s, color 0.3s;
        }
        
        .login-button:hover,
        .register-button:hover {
          background-color:#f3c15e;
          color: #fff;
        }
      `}</style>

      <nav className="navbar">
        <div className="flex items-center">
          <img src={FinalLogo} alt='...' className="logo" />
          <Link to='/' className="title">Exploring Ramayana: Blogs </Link>
        </div>
        <div>
  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
    <li style={{ marginRight: '20px' }}><a href="http://127.0.0.1:5000/#highlights">Highlights</a></li>
    <li style={{ marginRight: '10px' }}><a href="http://127.0.0.1:5000/#about">About</a></li>
    <li style={{ marginRight: '10px' }}><a href="http://localhost:8000/repository/">Library</a></li>
    <li style={{ marginRight: '10px' }}><a href="http://localhost:5173/">Blogs</a></li>
    <li style={{ marginRight: '10px' }}><a href="http://127.0.0.1:5000/">Chatbot</a></li>
  </ul>
</div>

      </nav>

      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        {/* <h1 className="text-l md:text-2xl font-extrabold text-center text-black hover:text-gray-500">
          <Link to="/">Exploring Ramayana: A Dynamic Blog Experience</Link>
        </h1> */}

        {path === "/" && (
          <div className="flex justify-center items-center space-x-2">
            <input 
              onChange={(e) => setPrompt(e.target.value)} 
              onKeyPress={handleSearch} 
              className="outline-none" 
              placeholder="Search a post" 
              type="text" 
              style={{ border: '1px solid black', borderRadius: '5px', padding: '5px 15px 5px 10px' }} 
            />
            <p onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))} className="cursor-pointer" style={{ marginLeft: '10px' }}><BsSearch /></p>
          </div>
        )}

        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login" className="login-button">Login</Link></h3>}
          {user ? (
            <div onClick={showMenu}>
              <p className='cursor-pointer'><FaBars /></p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3><Link to="/register" className="register-button">Register</Link></h3>
          )}
          
        </div>

        <div onClick={showMenu} className='md:hidden text-lg'>
          <p onClick={(e) => navigate("?search=" + prompt)} className='cursor-pointer'><FaBars /></p>
          {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
