import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Connection Requests
      </h1>
      {requests.map((request, index) => {
        const { _id, firstName, lastName, photoUrl, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 mb-4 bg-base-300 shadow-lg rounded-xl border border-base-200"
          >
            <img
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border border-base-200"
              src={photoUrl}
            />
            <div className="ml-4 text-left flex flex-col justify-center text-base-content">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              <p className="text-sm mt-1">{about}</p>
            </div>
            <div>
              <button className="btn btn-secondary mx-3">Accept</button>
              <button className="btn btn-primary mx-2">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
