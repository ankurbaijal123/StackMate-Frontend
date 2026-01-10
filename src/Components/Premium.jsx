import React from 'react'
import axios from "axios"
import { BASE_URL } from "../utils/constansts";
function Premium() {
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
      };
      console.log(options)

    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  return (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
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
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
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
      </div>
    </div>
  )
}

export default Premium
