import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
      if (location.pathname === "/" ) {
        navigate("/feed");
      }
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 return (
 <div className="flex flex-col min-h-screen overflow-hidden">

  <div className="mt-2 mx-3">
    <Navbar />
  </div>

  <main className="flex-grow overflow-auto">
    <Outlet />
  </main>

  <div className="mb-2 mx-3">
    <Footer />
  </div>
</div>


);

};

export default Body;
