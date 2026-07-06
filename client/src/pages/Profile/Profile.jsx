import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://ucab-btvg.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logged Out Successfully 👋");

    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <h1>User Profile</h1>

        <div className="profile-card">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
          />

          <h2>{user.name}</h2>

          <p><b>Email :</b> {user.email}</p>

          <p><b>Phone :</b> {user.phone}</p>

          <p><b>Role :</b> {user.role}</p>

          <button className="edit-btn">
            Edit Profile
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;