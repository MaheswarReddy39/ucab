import "./Payments.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Payments() {
  const navigate = useNavigate();
  const location = useLocation();

  const ride = location.state?.ride;
  const fare = location.state?.fare;

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://ucab-btvg.onrender.com/api/payment/pay",
        {
          rideId: ride._id,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment Successful ✅");

      navigate("/bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Payment Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="payment-container">
        <h1>Payment</h1>

        <h3>Total Fare : ₹{fare}</h3>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              value="Cash"
              checked={paymentMethod === "Cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash
          </label>
        </div>

        <button onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </>
  );
}

export default Payments;