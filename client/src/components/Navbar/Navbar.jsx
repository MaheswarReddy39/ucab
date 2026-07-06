import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">UCab</div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;