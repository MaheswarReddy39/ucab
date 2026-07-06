import "./CabCard.css";
import { useNavigate } from "react-router-dom";

function CabCard({ cab }) {

  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/bookride", {
      state: { cab }
    });
  };

  const imageUrl =
    cab.image?.startsWith("http")
      ? cab.image
      : `http://ucab-btvg.onrender.com${cab.image}`;

  return (

    <div className="cab-card">

      <img
        className="cab-image"
        src={imageUrl}
        alt={cab.name}
      />

      <div className="cab-card-body">

        <h3>{cab.name}</h3>

        <p><b>Type:</b> {cab.vehicleType}</p>

        <p><b>Capacity:</b> {cab.capacity} Seats</p>

        <p><b>Fare:</b> ₹{cab.farePerKm}/Km</p>

        <button
          className="book-btn"
          onClick={handleBook}
        >
          Book Cab
        </button>

      </div>
    </div>
  );

}

export default CabCard; 