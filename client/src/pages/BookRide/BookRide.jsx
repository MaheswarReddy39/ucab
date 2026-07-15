import "./BookRide.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookRide() {
  const navigate = useNavigate();
  const location = useLocation();

  const cab = location.state?.cab;

  const [pickupState, setPickupState] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupArea, setPickupArea] = useState("");

  const [dropState, setDropState] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [dropArea, setDropArea] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [dropTime, setDropTime] = useState("");

  const [fare, setFare] = useState(0);

  const states = [
    "Andhra Pradesh",
    "Telangana",
    "Karnataka",
    "Tamil Nadu",
    "Kerala",
  ];

  const cities = {
    "Andhra Pradesh": [
      "Anantapur",
      "Kurnool",
      "Kadapa",
      "Tirupati",
      "Vijayawada",
      "Visakhapatnam",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Karimnagar",
      "Nizamabad",
    ],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Kerala: ["Kochi", "Trivandrum", "Kozhikode"],
  };

  const calculateFare = () => {
    if (
      !pickupState ||
      !pickupCity ||
      !pickupArea ||
      !dropState ||
      !dropCity ||
      !dropArea ||
      !pickupDate ||
      !pickupTime ||
      !dropDate ||
      !dropTime
    ) {
      alert("Please fill all details");
      return;
    }

    const distance = 20; // Demo distance
    const totalFare = distance * cab.farePerKm;

    setFare(totalFare);
  };

  const handleBooking = async () => {
    if (fare === 0) {
      alert("Please calculate fare first");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/rides/book",
        {
          pickupLocation: `${pickupArea}, ${pickupCity}`,
          dropLocation: `${dropArea}, ${dropCity}`,
          distance: 20,
          latitude: 17.385,
          longitude: 78.4867,
          cab: cab._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ride Booked Successfully ✅");

      navigate("/payments", {
        state: {
          ride: res.data.ride,
          fare,
        },
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="book-container">
        <h1>Book a Ride</h1>

        <h3>Pickup Location</h3>

        <div className="location-row">
          <select
            value={pickupState}
            onChange={(e) => {
              setPickupState(e.target.value);
              setPickupCity("");
            }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>

          <select
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
          >
            <option>Select City</option>
            <option>Hyderabad</option>
            <option>Bengaluru</option>
            <option>Chennai</option>
            <option>Kochi</option>
            <option>Mumbai</option>
            <option>Vijayawada</option>
            <option>Visakhapatnam</option>
            <option>Tirupati</option>
            <option>Anantapur</option>
            <option>Kurnool</option>
            <option>Guntur</option>

            {pickupState &&
              cities[pickupState].map((city) => (
                <option key={city}>{city}</option>
              ))}
          </select>

          <input
            type="text"
            placeholder="Enter Area / Locality"
            value={pickupArea}
            onChange={(e) => setPickupArea(e.target.value)}
          />
        </div>

        <h3>Drop Location</h3>

        <div className="location-row">
          <select
            value={dropState}
            onChange={(e) => {
              setDropState(e.target.value);
              setDropCity("");
            }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>

          <select
            value={dropCity}
            onChange={(e) => setDropCity(e.target.value)}
          >
            <option>Select City</option>
            <option>Hyderabad</option>
            <option>Bengaluru</option>
            <option>Chennai</option>
            <option>Kochi</option>
            <option>Mumbai</option>
            <option>Vijayawada</option>
            <option>Visakhapatnam</option>
            <option>Tirupati</option>
            <option>Anantapur</option>
            <option>Kurnool</option>
            <option>Guntur</option>

            {dropState &&
              cities[dropState].map((city) => (
                <option key={city}>{city}</option>
              ))}
          </select>

          <input
            type="text"
            placeholder="Enter Area / Locality"
            value={dropArea}
            onChange={(e) => setDropArea(e.target.value)}
          />
        </div>

        <label>Pickup Date</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />

        <label>Pickup Time</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
        />

        <label>Drop Date</label>
        <input
          type="date"
          value={dropDate}
          onChange={(e) => setDropDate(e.target.value)}
        />

        <label>Drop Time</label>
        <input
          type="time"
          value={dropTime}
          onChange={(e) => setDropTime(e.target.value)}
        />

        <button onClick={calculateFare}>Calculate Fare</button>

        {fare > 0 && (
          <div className="fare-box">
            <h2>Total Fare : ₹{fare}</h2>

            <p>
              Cab : <b>{cab?.name}</b>
            </p>

            <p>
              Type : <b>{cab?.vehicleType}</b>
            </p>

            <p>
              ₹{cab?.farePerKm}/Km × 20 Km
            </p>
          </div>
        )}

        <button onClick={handleBooking}>Book Ride</button>
      </div>
    </>
  );
}

export default BookRide;