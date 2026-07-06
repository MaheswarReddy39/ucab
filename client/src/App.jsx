import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MyBookings from "./pages/MyBookings/MyBookings";
import Payments from "./pages/Payments/Payments";
import RideHistory from "./pages/RideHistory/RideHistory";
import BookRide from "./pages/BookRide/BookRide";
import Profile from "./pages/Profile/Profile";
import TrackRide from "./pages/TrackRide/TrackRide";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Users from "./pages/Users/Users";
import AddCab from "./pages/AddCab/AddCab";
import AddCabView from "./pages/AdminCabView/AdminCabView";
import EditCab from "./pages/EditCab/EditCab";
import AdminBookings from "./pages/AdminBookings/AdminBookings";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/addcab" element={<AddCab />} />
        <Route path="/AddCabView" element={<AddCabView />} />
        <Route path="/EditCab" element={<EditCab />} />
        <Route path="/bookride" element={<BookRide />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookride"
          element={
            <ProtectedRoute>
              <BookRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <RideHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trackride"
          element={
            <ProtectedRoute>
              <TrackRide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminDashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/users"
          element={<Users />}
        />
        <Route
          path="/AdminCabView"
          element={<AddCabView />}
        />
        <Route
          path="/editCab/:id"
          element={<EditCab />}
        />
        <Route
          path="/adminBookings"
          element={<AdminBookings />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;