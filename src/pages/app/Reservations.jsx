import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export";
import { useNavigate } from "react-router";
import axios from "../../axios";
import CustomLoader from "../../components/global/CustomLoader"; // Import the CustomLoader component 


const Reservations = () => {
  const [activeTab, setActiveTab] = useState("requested");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/reservations/pending");
        if (response.data.success) {
          setReservations(response.data.data.reservations);
        } else {
          setError("Failed to load reservations.");
        }
      } catch (err) {
        setError("An error occurred while fetching reservations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

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

  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Tabs */}
      <div className="flex justify-between space-x-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 pt-3">Pending Reservations</h1>
        </div>
        {/* <div>
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
        </div> */}
      </div>

      {/* Content */}
      {loading ? (
        // 🔄 Custom Skeleton Loader while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CustomLoader key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : reservations.length === 0 ? (
        // Show "No reservations available" if no reservations exist
        <div className="text-center py-4 text-gray-600">No reservations available</div>
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
      alt={reservation?.user?.name || 'User'}
      className="w-10 h-10 rounded-full object-contain"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
      {reservation?.user?.name
        ?.split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
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
      {reservation.vehicle.vehicleName} • {reservation.vehicle.vehicleType}
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
                {/* <div className="flex items-center gap-1">
                  <FaLocationDot className="text-green-500" /> {reservation.totalDistance} KM
                </div> */}
                <div className="flex items-center gap-1">
                  <BsClock className="text-orange-500" />
                  {new Date(reservation.startDate).toLocaleTimeString()} -{" "}
                  {new Date(reservation.vehicleReturnDate).toLocaleTimeString()}
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                {/* <div>
                  <p className="text-xs text-gray-500">Participant Name</p>
                  <p className="font-semibold text-gray-800">John Doe</p>
                </div> */}
                <div>                  <p className=" font-semibold text-gray-500">Status</p>
</div>
                <div className="text-right">
                  {/* <p className="text-xs text-gray-500">Status</p> */}
                  <p className="font-semibold text-gray-800">
                    {reservation.isCurrentReservation ? "Ongoing" : "Pending"}
                  </p>
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
  