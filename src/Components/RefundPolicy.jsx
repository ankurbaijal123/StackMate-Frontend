import React from "react";

const RefundPolicy = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Refund and Cancellation Policy</h1>
      <p className="m-2">
        Since this is a demo project created for learning and testing Razorpay integration, no real
        payments are processed, and therefore, no refunds or cancellations are applicable.
      </p>
      <p>
        If you made a payment in test mode, it will not be charged to your account. For any concerns,
        please reach out at <strong>ankur.baijal11@gmailcom</strong>.
      </p>
    </div>
  );
};

export default RefundPolicy;
