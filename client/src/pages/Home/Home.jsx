import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import CabCard from "../../components/CabCard/CabCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cabs");
        setCabs(res.data.cabs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCabs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Available Cabs</h1>

        <div className="cards">
          {cabs.map((cab) => (
            <CabCard key={cab._id} cab={cab} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;