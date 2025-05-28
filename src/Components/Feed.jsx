import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const feedData = async () => {
    if (feed) return;
    try {
      const res = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() =>{
    feedData()
  }, [])
  if(!feed) return
  if(feed.length <= 0){
    return (
      <div className="text-2xl text-red-600">
      "No New Users Available"
      </div>
    )
  }
  return(
    feed && (
      <div className= "flex justify-center my-10">
    <UserCard user={feed[0]}/>
    </div>
    )
  )
};

export default Feed;
