import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constansts";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || null);
  const [age, setAge] = useState(user.age || null);
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    //setShowToast(false)
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, gender, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));

      setShowToast(true);
      const i = setTimeout(() =>{
        setShowToast(false)
      }, 3000)
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Edit Profile
              </h2>

              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">FirstName</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">LastName</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>
      )}
    </>
  );
};

export default EditProfile;
