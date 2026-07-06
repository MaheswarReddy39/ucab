import "./RideHistory.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function RideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/rides/my-rides",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRides(res.data.rides);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="history-container">
        <h1>Ride History</h1>

        {rides.length === 0 ? (
          <h3>No Ride History Found</h3>
        ) : (
          rides.map((ride) => (
            <div className="ride-card" key={ride._id}>
              <h2>{ride.cab?.name || "Cab"}</h2>

              <p>
                <b>Pickup :</b> {ride.pickupLocation}
              </p>

              <p>
                <b>Drop :</b> {ride.dropLocation}
              </p>

              <p>
                <b>Fare :</b> ₹{ride.fare}
              </p>

              <p>
                <b>Status :</b> {ride.status}
              </p>

              <p>
                <b>Payment :</b> {ride.paymentStatus}
              </p>

              <p>
                <b>Transaction :</b> {ride.transactionId || "N/A"}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default RideHistory;