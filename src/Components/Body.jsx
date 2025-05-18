import React from 'react'
import {Navigate, Outlet, useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import {BASE_URL} from "../utils/constansts"
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const fetchUser = async () => {
    if(userData){
      return
    }
    try{
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials : true,
      })
      console.log(BASE_URL + "/profile/view")
      dispatch(addUser(user.data))
      

    }
    catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      console.error(err)
      
    }
  }

  useEffect(() =>{
      fetchUser()
  }, [])
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body