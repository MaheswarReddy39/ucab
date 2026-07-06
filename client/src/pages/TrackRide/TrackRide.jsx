import "./TrackRide.css";
import Navbar from "../../Components/Navbar/Navbar";

function TrackRide() {
  return (
    <>
      <Navbar />

      <div className="track-container">

        <div className="map">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200"
            alt="map"
          />
        </div>

        <div className="ride-info">
          <h2>Driver Details</h2>

          <p><b>Driver :</b> Pooja Singh</p>
          <p><b>Cab :</b> Maruti Swift</p>
          <p><b>Vehicle No :</b> TS09AB1234</p>

          <h3>ETA : 5 mins</h3>

          <button>Call Driver</button>

        </div>

      </div>
    </>
  );
}

export default TrackRide;