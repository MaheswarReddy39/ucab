import "./AdminDashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [cabs, setCabs] = useState(0);
  const [bookings, setBookings] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.dashboard;

      setUsers(data.totalUsers);
      setCabs(data.totalCabs);
      setBookings(data.totalRides);

    } catch (err) {
      console.log(err);
    }
  };
  const chartData = [
    {
      name: "Users",
      value: users,
    },
    {
      name: "Cabs",
      value: cabs,
    },
    {
      name: "Bookings",
      value: bookings,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="admin-dashboard">

        <h1 className="dashboard-title">
          Dashboard
        </h1>

        <div className="dashboard-box">

          <div className="dashboard-cards">

            <div className="card">
              <h2>USERS</h2>
              <p>{users}</p>
            </div>

            <div className="card">
              <h2>CABS</h2>
              <p>{cabs}</p>
            </div>

            <div className="card">
              <h2>BOOKINGS</h2>
              <p>{bookings}</p>
            </div>

          </div>

          <div className="chart-box">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="value"
                  fill="#ffb300"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;