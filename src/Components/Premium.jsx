import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
import { BASE_URL } from "../utils/constansts";
function Premium() {
  const [isPremium, setIsPremium] = useState(false)

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/payment/verify",
        { withCredentials: true }
      );
      console.log(res)

      if (res.data.isPremium === true) {
        setIsPremium(true);
      }
      
    } catch (err) {
      console.error(err);
    }
  };

 useEffect(() => {
  verifyPremiumUser();
}, []);

  console.log(isPremium)
  
  const handlePremiumClick = async (premiumType) => {
    const res = await axios.post(BASE_URL + "/payment/create", {
      type: premiumType
     },{withCredentials: true})
    // open the razorpay dialogbox now
    const options = {
        key:  res.data.keyId , 
        amount: res.data.amount, // Amount is in currency subunits.
        currency: res.data.currency,
        name: "STACKMATE MEMBERSHIP",
        description: 'Connect to other developer community',
        order_id: res.data.orderId , // This is the order_id created in the backend
        prefill: {
          name: res.data.notes.firstName + " " + res.data.notes.lastName,
          email: res.data.notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler:()=> verifyPremiumUser()
      };
      

    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  return (
    <div className="m-10">
      {isPremium ? <div className='text-white'>You are a premium user</div> : <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="card bg-base-300 rounded-box grid h-auto md:h-80 flex-grow place-items-center p-6">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handlePremiumClick("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider md:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-auto md:h-80 flex-grow place-items-center p-6"
>
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Inifinite connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button

            className="btn btn-primary"
            onClick={() => handlePremiumClick("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>}
    </div>
  )
}

export default Premium
