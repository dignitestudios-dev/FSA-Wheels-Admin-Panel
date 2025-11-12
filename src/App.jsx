import { Navigate, Route, Routes } from "react-router";
// import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

// App Pages
import DummyHome from "./pages/app/DummyHome";
import Inventory from "./pages/app/Inventory";
import Users from "./pages/app/Users";
import Reservations from "./pages/app/Reservations";
import CreateUser from "./pages/app/CreateUser";
import Notifications from "./pages/app/Notifications";
import ReservationDetails from "./pages/app/ReservationDetails";
import ReservationCompleted from "./pages/app/ReservationCompleted";
import UserDetails from "./pages/app/UserDetails";

// Auth Pages
import DummyLogin from "./pages/authentication/DummyLogin";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import Verification from "./pages/authentication/Verification";

// Route Guard
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Rides from "./pages/app/Rides";
import RideDetails from "./pages/app/RideDetails";
import Sos from "./pages/app/Sos";

function App() {
  return (
    <Routes>
      {/* 🔐 Protected App Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DummyHome />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="users" element={<Users />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="reservation-details" element={<ReservationDetails />} />
          <Route path="reservation-completed" element={<ReservationCompleted />} />
          <Route path="notifications" element={<Notifications />} />
                    <Route path="rides" element={<Rides />} />
                    <Route path="ride-details" element={<RideDetails />} />
                    <Route path="sos" element={<Sos />} />

        </Route>
      </Route>

      {/* 🔓 Public Auth Routes */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<DummyLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="verification" element={<Verification />} />
      </Route>

      {/* Redirect root to login */}

      <Route path="/" element={<Navigate to="/auth/login" />} />

      {/* 404 Fallback */}
      <Route
        path="*"
        element={<div className="text-7xl text-center mt-10">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
