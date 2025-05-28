import React from 'react'
import { BASE_URL } from '../utils/constansts'
import { useDispatch } from 'react-redux'
import {removeUserFromFeed} from '../utils/feedSlice'
import axios from 'axios'

const UserCard = ({user}) => {
    const { _id,firstName, lastName, photoUrl, age, gender, about, skills} = user
  const dispatch = useDispatch()
    const handleSendRequest = async(status, userId) => {
      try{
        const res = await axios.post(
          BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials : true}
        );
        dispatch(removeUserFromFeed(userId))

      }
      catch(err){
          console.error(err)
      }
    }

  return (
    <>
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src= {photoUrl}
      alt="User Profile" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{about}</p>
    {age && gender && <p>{age} years {gender}</p>}
    <p>{skills}</p>
    <div className="card-actions justify-center my-4">
    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
    <button className="btn btn-secondary" onClick={() => handleSendRequest("intrested", _id)}>Intrested</button>
    </div>
    
  </div>
</div>
    </>
  )
}

export default UserCard