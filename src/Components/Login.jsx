import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constansts";
const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState(true);
  const [ gender, setGender] = useState("")

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {  
          firstName,
          lastName,
          emailId,
          password,
          gender
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center m-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">
            {loginForm ? "Login" : "SignUp"}
          </h2>

          {!loginForm && (
            <>
              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="email"
                  placeholder="Ankur"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control w-full max-w-xs py-4">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="email"
                  placeholder="Baijal"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Email ID</span>
            </label>
            <input
              type="email"
              placeholder="you@gamil.com"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!loginForm && (<div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <input
              type="text"
              placeholder="Male"
              className="input input-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>)}
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-full" onClick={loginForm ? handleLogin : handleSignUp}>
              {loginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="m-3 text-white cursor-pointer " onClick={() => setLoginForm(!loginForm)}>{loginForm ? "Create an Account ? SignUp" : "Existing User? Login to your Account"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
