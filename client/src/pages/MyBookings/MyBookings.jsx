import "./MyBookings.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://ucab-btvg.onrender.com/api/rides/my-rides",
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

      <div className="booking-page">
        <h1 className="booking-title">My Bookings</h1>

        {rides.length === 0 ? (
          <h2 className="no-booking">No Bookings Found</h2>
        ) : (
          rides.map((ride) => (
            <div className="booking-card" key={ride._id}>
              <div className="booking-grid">

                <div>
                  <h4>Cab Booked Date</h4>
                  <p>{new Date(ride.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <h4>Trip</h4>
                  <p>
                    {ride.pickupLocation} ➜ {ride.dropLocation}
                  </p>
                </div>

                <div>
                  <h4>Pickup</h4>
                  <p>{new Date(ride.createdAt).toLocaleTimeString()}</p>
                </div>

                <div>
                  <h4>Drop</h4>
                  <p>--</p>
                </div>

                <div>
                  <h4>Driver</h4>
                  <p>{ride.cab?.driverName || "Not Assigned"}</p>
                </div>

                <div>
                  <h4>Car</h4>
                  <p>{ride.cab?.name}</p>
                </div>

                <div>
                  <h4>Car Type</h4>
                  <p>{ride.cab?.vehicleType}</p>
                </div>

                <div>
                  <h4>Car No</h4>
                  <p>{ride.cab?.carNumber}</p>
                </div>

                <div>
                  <h4>Amount Paid</h4>
                  <p>₹{ride.fare}</p>
                </div>

                <div>
                  <h4>Status</h4>
                  <p className="status">{ride.status}</p>
                </div>

              </div>

              <button
                className="track-btn"
                onClick={() =>
                  navigate("/history", {
                    state: { ride },
                  })
                }
              >
                Track Ride
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyBookings;