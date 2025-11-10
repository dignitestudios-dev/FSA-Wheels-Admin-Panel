import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export";
import { useNavigate } from "react-router";
import axios from "../../axios";
import CustomLoader from "../../components/global/CustomLoader";

const Reservations = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const tabs = ["pending", "approved", "rejected", "cancelled", "completed"];

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/admin/reservations?status=${activeTab}`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setReservations(response.data.data);
        } else {
          setReservations([]);
          setError("No reservations found.");
        }
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("An error occurred while fetching reservations.");
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCardClick = (reservation) => {
    if (activeTab === "completed") {
      navigate(`/app/reservation-completed`, { state: reservation });
    } else {
      navigate(`/app/reservation-details`, { state: reservation });
    }
  };
  console.log("Reservations:", reservations);

  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Tabs */}
      <div className="flex justify-between space-x-4 border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800 pt-3">
          Reservations
        </h1>
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-2 px-4 text-lg font-semibold capitalize ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CustomLoader key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          No {activeTab} reservations available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col cursor-pointer"
              onClick={() => handleCardClick(reservation)}
            >
              {/* Driver Info */}
              <div className="flex items-center gap-3">
                {reservation?.user?.profilePicture ? (
                  <img
                    src={reservation.user.profilePicture}
                    alt={reservation?.user?.name || "User"}
                    className="w-10 h-10 rounded-full object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                    {reservation?.user?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-800">
                  {reservation?.user?.name}
                </span>
              </div>

              {/* Vehicle Info */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-gray-800 flex flex-col">
                  <span className="flex items-center">
                    <IoCarSportOutline className="text-xl inline-block mr-2" />
                    {reservation.vehicle
                      ? `${reservation.vehicle.make} ${reservation.vehicle.model}`
                      : "Vehicle Not Assigned"}
                  </span>
                  {reservation.vehicle && (
                    <span className="text-sm text-gray-500">
                      {reservation.vehicle.vehicleName} •{" "}
                      {reservation.vehicle.vehicleType}
                    </span>
                  )}
                </span>
                <img
                  src={reservation.vehicle?.image || audi}
                  alt={reservation.vehicle?.name || "Car"}
                  className="w-32 h-24 object-contain"
                />
              </div>

              {/* Ride Info */}
              <div className="flex items-center gap-6 mt-4 text-gray-700 text-sm font-medium">
                <div className="flex items-center gap-1">
                  <FaUsers className="text-blue-500" /> {reservation.vehicleSeat}
                </div>
                <div className="flex items-center gap-1">
                  <BsClock className="text-orange-500" />
                  {new Date(reservation.startDate).toLocaleTimeString()} -{" "}
                  {new Date(reservation.vehicleReturnDate).toLocaleTimeString()}
                </div>
              </div>

              {/* Status Info */}
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="font-semibold text-gray-500">Status</p>
                <p
                  className={`font-semibold capitalize ${
                    reservation.status === "approved"
                      ? "text-green-600"
                      : reservation.status === "rejected"
                      ? "text-red-600"
                      : reservation.status === "cancelled"
                      ? "text-gray-500"
                      : reservation.status === "completed"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {reservation.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
