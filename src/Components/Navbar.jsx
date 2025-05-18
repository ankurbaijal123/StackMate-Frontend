import React from "react";
import { useSelector , useDispatch} from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constansts";
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() =>{
    try{
       await axios.post(BASE_URL + "/logout", {}, {withCredentials : true});
       dispatch(removeUser())
       navigate("/login")
    }
    catch(err){
      console.error(err)
    }
  }
  return (
    <>
      <div className="navbar bg-base-300 ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">StackMate 🧑‍💻</Link>
        </div>
        {user && (
        <div className="flex gap-2">
          
            <div className="dropdown dropdown-end mx-2 flex">
              <p className="px-4 text-xl">Welcome, {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li >
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
         
        </div>
         )}
      </div>
    </>
  );
};

export default Navbar;
