import React, { useState, useEffect } from "react";
import { FaUsers, FaCalendarCheck, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router";
import DashboardUsers from "../../components/DashboardUsers";
import axios from "../../axios";
import CreateNotifications from "../../components/CreateNotifications";

/* ===================== STAT CARD COMPONENT ===================== */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    {icon}
  </div>
);

/* ===================== MAIN DASHBOARD ===================== */
const DummyHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    reservations: 0,
    sos: 0,
    rides: 0,
    activeReservations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const navigate = useNavigate();

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/dashboard/stats");
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        setError("Failed to fetch dashboard stats.");
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Something went wrong while fetching dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6 pt-0">
      {/* ===================== HEADER ===================== */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

        <button
          onClick={() => setShowNotificationModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <FaBell />
          Create Notification
        </button>
      </div>

      {/* ===================== STATS GRID ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md animate-pulse"
              >
                <div className="h-4 bg-gray-300 w-1/3 mb-3 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ))
        ) : error ? (
          <p className="text-red-500 col-span-5">{error}</p>
        ) : (
          <>
            <StatCard
              title="Total Users"
              value={stats.users}
              icon={<FaUsers className="text-4xl text-blue-600" />}
            />
            <StatCard
              title="Total Reservations"
              value={stats.reservations}
              icon={<FaCalendarCheck className="text-4xl text-yellow-500" />}
            />
            <StatCard
              title="SOS"
              value={stats.sos}
              icon={<FaBell className="text-4xl text-red-500" />}
            />
            <StatCard
              title="Active Reservations"
              value={stats.activeReservations}
              icon={<FaCalendarCheck className="text-4xl text-indigo-500" />}
            />
          </>
        )}
      </div>

      {/* ===================== USERS TABLE ===================== */}
      <DashboardUsers />

      {/* ===================== CREATE NOTIFICATION MODAL ===================== */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setShowNotificationModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Create Notification
            </h2>

            <CreateNotifications
              closeModal={() => setShowNotificationModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DummyHome;
