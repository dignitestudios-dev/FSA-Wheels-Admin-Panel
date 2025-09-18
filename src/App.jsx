import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import DummyHome from "./pages/app/DummyHome";
// import DummyLogin from "./pages/authentication/DummyLogin";
import AuthLayout from "./layouts/AuthLayout";
import Inventory from "./pages/app/Inventory";
import Users from "./pages/app/Users";
import Reservations from "./pages/app/Reservations";
import CreateUser from "./pages/app/CreateUser";
import Notifications from "./pages/app/Notifications";
import ReservationDetails from "./pages/app/ReservationDetails";

function App() {
  return (
    <Routes>
      {/* <Route
        path="/"
        <Route path="app" element={<DashboardLayout />}>
        <Route path="/" element={<DummyHome />} />
      </Route>
      /> */}

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DummyHome />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="inventory" element={<Inventory />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="users" element={<Users />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="create-user" element={<CreateUser />} />
      </Route>


        <Route path="app" element={<DashboardLayout />}>
        <Route path="reservation-details" element={<ReservationDetails />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="notifications" element={<Notifications />} />
      </Route>

      


      


  <Route path="app" element={<DashboardLayout />}>
        <Route path="reservations" element={<Reservations />} />
      </Route>

      {/* <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<DummyLogin />} />
      </Route> */}

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
