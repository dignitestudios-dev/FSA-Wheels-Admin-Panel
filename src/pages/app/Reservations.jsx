import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi, hyundai, van } from "../../assets/export";
import { useNavigate } from "react-router";
import axios from "../../axios"; // Import axios instance

const Reservations = () => {
  const [activeTab, setActiveTab] = useState("requested"); // State to manage active tab
  const [reservations, setReservations] = useState([]); // State to store reservation data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [error, setError] = useState(""); // Error state to display any issues fetching data
  const navigate = useNavigate(); // Navigation hook

  // Fetch reservations on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/reservations/pending"); // Fetch data from API
        if (response.data.success) {
          setReservations(response.data.data.reservations); // Set reservations state
        } else {
          setError("Failed to load reservations.");
        }
      } catch (err) {
        setError("An error occurred while fetching reservations.");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading after the request is completed
      }
    };

    fetchReservations();
  }, []);

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle card click and navigate to reservation details
  const handleCardClick = (reservationId) => {
    if (activeTab === "completed") {
      navigate(`/app/reservation-completed`);
    } else {
      navigate(`/app/reservation-details`);
    }
  };

  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Tabs for switching categories */}
      <div className="flex justify-between space-x-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 pt-3">Reservations</h1>
        </div>
        <div>
          <button
            onClick={() => handleTabChange("requested")}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "requested"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Requested
          </button>
          <button
            onClick={() => handleTabChange("ongoing")}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "ongoing"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Ongoing
          </button>
          <button
            onClick={() => handleTabChange("completed")}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Loading/Error State */}
      {loading ? (
        <div className="text-center py-4 text-gray-600">Loading reservations...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        // Grid Layout for Reservation Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col cursor-pointer"
              onClick={() => handleCardClick(reservation._id)} // Handle card click
            >
              {/* Driver Info (Placeholder, not in API data) */}
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/10.jpg"
                  alt="Driver"
                  className="w-10 h-10 rounded-full object-contain"
                />
                <span className="text-sm font-semibold text-gray-800">Driver Name</span>
              </div>

              {/* Top row: Driver Info + Car Image (Placeholder for now) */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm flex items-center font-semibold text-gray-800 border border-black rounded-full px-2 py-1">
                    <IoCarSportOutline className="mr-1 text-xl" />
                    {reservation.vehicle || "Vehicle Not Assigned"}
                  </span>
                </div>
                <img
                  src={reservation.vehicle ? reservation.vehicle.image : audi} // Placeholder image
                  alt={reservation.vehicle || "Car"}
                  className="w-32 h-24 object-contain"
                />
              </div>

              {/* Ride Info */}
              <div className="flex items-center gap-6 mt-4 text-gray-700 text-sm font-medium">
                <div className="flex items-center gap-1">
                  <FaUsers className="text-blue-500" /> {reservation.vehicleSeat}
                </div>
                <div className="flex items-center gap-1">
                  <FaLocationDot className="text-green-500" /> {reservation.totalDistance} KM
                </div>
                <div className="flex items-center gap-1">
                  <BsClock className="text-orange-500" /> {new Date(reservation.startDate).toLocaleTimeString()} -{" "}
                  {new Date(reservation.vehicleReturnDate).toLocaleTimeString()}
                </div>
              </div>

              {/* Bottom Details */}
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-500">Participant Name</p>
                  <p className="font-semibold text-gray-800">John Doe</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">No. of Rides</p>
                  <p className="font-semibold text-gray-800">{reservation.isCurrentReservation ? "Ongoing" : "Pending"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
