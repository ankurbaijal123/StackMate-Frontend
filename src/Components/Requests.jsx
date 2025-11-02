import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
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
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="w-full max-w-[700px] bg-base-300 shadow-md rounded-xl border border-base-200 p-3 mb-3
                       flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
    
            <div className="flex justify-center sm:justify-start">
              <img
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border border-base-200"
                src={photoUrl}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-lg sm:text-xl">
                {firstName} {lastName}
              </h2>
              <p className="text-sm mt-1 text-gray-600 line-clamp-2">{about}</p>
            </div>

            <div className="flex justify-center sm:justify-end gap-3">
              <button
                className="btn btn-secondary btn-sm sm:btn-md"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary btn-sm sm:btn-md"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
