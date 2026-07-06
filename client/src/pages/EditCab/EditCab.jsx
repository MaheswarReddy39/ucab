import "./EditCab.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCab() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCab();
  }, []);

  const fetchCab = async () => {
    try {
      const res = await axios.get(
        `http://ucab-btvg.onrender.com/api/cabs/${id}`
      );

      setCab(res.data.cab);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCab({
      ...cab,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
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

      await axios.put(
        `http://ucab-btvg.onrender.com/api/cabs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Cab Updated Successfully");

      navigate("/AdminCabView");

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="editcab-page">

        <div className="editcab-box">

          <h1>Edit Car Data</h1>

          <form onSubmit={handleUpdate}>

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
              placeholder="Vehicle Type"
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

            <label>Car Image</label>

            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

            <button type="submit">
              Update
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditCab;