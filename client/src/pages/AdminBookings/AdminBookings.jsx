import "./AdminBookings.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://ucab-btvg.onrender.com/api/rides",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRides(res.data.rides);

    } catch (err) {
      console.log(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "completed";

      case "accepted":
        return "accepted";

      case "started":
        return "started";

      case "cancelled":
        return "cancelled";

      default:
        return "pending";
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-bookings">

        <h1>All Bookings</h1>

        {rides.length === 0 ? (

          <h2>No Bookings Found</h2>

        ) : (

          <div className="booking-grid">

            {rides.map((ride) => (

              <div
                className="booking-card"
                key={ride._id}
              >

                <div className="booking-top">

                  <h3>
                    {ride.cab?.name || "Cab"}
                  </h3>

                  <span
                    className={getStatusClass(
                      ride.status
                    )}
                  >
                    {ride.status}
                  </span>

                </div>

                <div className="booking-body">

                  <p>

                    <strong>User :</strong>{" "}

                    {ride.user?.name || "N/A"}

                  </p>

                  <p>

                    <strong>Driver :</strong>{" "}

                    {ride.driver?.name || "Not Assigned"}

                  </p>

                  <p>

                    <strong>Pickup :</strong>{" "}

                    {ride.pickupLocation}

                  </p>

                  <p>

                    <strong>Drop :</strong>{" "}

                    {ride.dropLocation}

                  </p>

                  <p>

                    <strong>Vehicle :</strong>{" "}

                    {ride.cab?.vehicleType}

                  </p>

                  <p>

                    <strong>Distance :</strong>{" "}

                    {ride.distance} KM

                  </p>

                  <p>

                    <strong>Fare :</strong>

                    ₹{ride.fare}

                  </p>

                  <p>

                    <strong>Payment :</strong>{" "}

                    {ride.paymentStatus}

                  </p>

                  <p>

                    <strong>Date :</strong>{" "}

                    {new Date(
                      ride.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default AdminBookings;