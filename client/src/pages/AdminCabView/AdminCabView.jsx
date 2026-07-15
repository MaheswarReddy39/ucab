import "./AdminCabView.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCabView() {
  const navigate = useNavigate();

  const [cabs, setCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");

  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchCabs();
  }, []);

  useEffect(() => {
    filterCabs();
  }, [searchName, searchType, cabs]);

  const fetchCabs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cabs"
      );

      setCabs(res.data.cabs);
      setFilteredCabs(res.data.cabs);

    } catch (err) {
      console.log(err);
    }
  };

  const filterCabs = () => {
    let data = [...cabs];

    if (searchName !== "") {
      data = data.filter((cab) =>
        cab.name
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    if (searchType !== "") {
      data = data.filter((cab) =>
        cab.vehicleType
          .toLowerCase()
          .includes(searchType.toLowerCase())
      );
    }

    setFilteredCabs(data);
  };

  const sortPrice = () => {

    let data = [...filteredCabs];

    if (sortAsc) {
      data.sort((a, b) => a.farePerKm - b.farePerKm);
    } else {
      data.sort((a, b) => b.farePerKm - a.farePerKm);
    }

    setSortAsc(!sortAsc);
    setFilteredCabs(data);
  };

  const deleteCab = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this Cab?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/cabs/${id}`
      );

      alert("Cab Deleted");

      fetchCabs();

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <Navbar />

      <div className="cab-page">

        <h1>Car List</h1>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search by car name"
            value={searchName}
            onChange={(e) =>
              setSearchName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Search by car type"
            value={searchType}
            onChange={(e) =>
              setSearchType(e.target.value)
            }
          />

          <button
            className="sort-btn"
            onClick={sortPrice}
          >
            Sort Price {sortAsc ? "↑" : "↓"}
          </button>

        </div>

        <div className="cab-grid">

          {filteredCabs.map((cab) => (

            <div
              className="cab-card"
              key={cab._id}
            >

              <img
                src={
                  cab.image.startsWith("http")
                    ? cab.image
                    : `http://localhost:5000/uploads/${cab.image}`
                }
                alt={cab.name}
              />

              <h3>
                Driver :
                {" "}
                {cab.driverName || "Not Assigned"}
              </h3>

              <p>
                <b>Model:</b> {cab.name}
              </p>

              <p>
                <b>Type:</b> {cab.vehicleType}
              </p>

              <p>
                <b>Number:</b>{" "}
                {cab.carNumber || "--"}
              </p>

              <p>
                <b>Price:</b>
                ₹{cab.farePerKm}/Km
              </p>

              <div className="btns">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/editCab/${cab._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteCab(cab._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default AdminCabView;