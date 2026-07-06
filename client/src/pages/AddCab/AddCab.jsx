import "./AddCab.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";

function AddCab() {

  const [cab, setCab] = useState({
    driverName: "",
    name: "",
    vehicleType: "",
    carNumber: "",
    capacity: "",
    baseFare: "",
    farePerKm: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setCab({
      ...cab,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("driverName", cab.driverName);
      formData.append("name", cab.name);
      formData.append("vehicleType", cab.vehicleType);
      formData.append("carNumber", cab.carNumber);
      formData.append("capacity", cab.capacity);
      formData.append("baseFare", cab.baseFare);
      formData.append("farePerKm", cab.farePerKm);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://ucab-btvg.onrender.com/api/cabs/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Cab Added Successfully");

      setCab({
        driverName: "",
        name: "",
        vehicleType: "",
        carNumber: "",
        capacity: "",
        baseFare: "",
        farePerKm: "",
        image: "",
      });

    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Failed to Add Cab");
    }

  };

  return (
    <>
      <Navbar />

      <div className="addcab-page">

        <div className="addcab-box">

          <h1>Add Cab</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="driverName"
              placeholder="Driver Name"
              value={cab.driverName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="name"
              placeholder="Car Model"
              value={cab.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="vehicleType"
              placeholder="Car Type"
              value={cab.vehicleType}
              onChange={handleChange}
            />

            <input
              type="text"
              name="carNumber"
              placeholder="Car Number"
              value={cab.carNumber}
              onChange={handleChange}
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={cab.capacity}
              onChange={handleChange}
            />

            <input
              type="number"
              name="baseFare"
              placeholder="Base Fare"
              value={cab.baseFare}
              onChange={handleChange}
            />

            <input
              type="number"
              name="farePerKm"
              placeholder="Fare Per KM"
              value={cab.farePerKm}
              onChange={handleChange}
            />

            <div className="file-input">
              <label>Car Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button type="submit">
              Submit
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddCab;