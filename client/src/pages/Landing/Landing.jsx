import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">UCab</div>

        <div className="nav-links">
          <Link to="/login">Login ▾</Link>
        </div>
      </nav>

      <section className="hero">

        <h1>Your Ride, Your Way</h1>

        <p>
          Reliable. Fast. Affordable. Book cabs anytime, anywhere.
        </p>

        <Link to="/login" className="explore-btn">
          Explore Services
        </Link>

        <img
          src="./src/assets/taxy.png"
          alt="Taxi"
          className="hero-img"
        />

      </section>
    </>
  );
}

export default Landing;