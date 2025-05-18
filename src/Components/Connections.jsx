import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constansts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-2xl font-bold text-primary mb-6">Connections</h1>
      {connections.map((connection, index) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div
            key={_id}
            className="flex w-full max-w-2xl p-4 mb-4 bg-base-300 shadow-lg rounded-xl border border-base-200"
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
              <p className="text-sm opacity-80">Age: {age}, Gender: {gender}</p>
              <p className="text-sm mt-1">{about}</p>
            </div>
            
          </div>
        );
      })}
    </div>
  );
  
  
    }  

export default Connections;
