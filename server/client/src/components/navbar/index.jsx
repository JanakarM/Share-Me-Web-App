import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdAdd } from 'react-icons/io'
import "./styles.css";

const Navbar = ({ user, searchTerm, setSearchTerm }) => {
    const navigate= useNavigate()
    return (
      <div className="flex my-3 w-full gap-3 md:gap-5 items-center">
        <div className="flex p-2 items-center bg-white w-full outline-none border-none focus-within:shadow-lg rounded-md">
          <IoMdSearch fontSize={21} />
          <input className="outline-none w-full ml-1" placeholder="Search" onFocus={()=> navigate('/')}
            value={searchTerm}
            onChange={(e)=> {setSearchTerm(e.target.value)}}
          />
        </div>
        <Link to={`/user-profile/${user?.id}`} className="hidden md:block cursor-pointer">
          <img src={`/file/download?fileName=${user.profilePicUrl}`} alt="user-img" className="w-12 rounded-full" />
        </Link>
        <Link to='/create-pin' className="cursor-pointer flex items-center justify-center bg-white shadow-md hover:shadow-xl border-2 border-gray w-12 h-10 rounded-xl">
          <IoMdAdd />
        </Link>
      </div>
    );
  }

export default Navbar;
