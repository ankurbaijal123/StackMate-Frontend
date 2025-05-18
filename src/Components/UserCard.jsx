import React from 'react'

const UserCard = ({user}) => {
    const { firstName, lastName, photoUrl, age, gender, about, skills} = user
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
    <button className="btn btn-primary">Ignore</button>
    <button className="btn btn-secondary">Intrested</button>
    </div>
    
  </div>
</div>
    </>
  )
}

export default UserCard