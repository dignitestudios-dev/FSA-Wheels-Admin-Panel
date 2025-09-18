import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi, hyundai, van } from "../../assets/export";
import { useNavigate } from "react-router"; // Import useNavigate for navigation

const Reservations = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("requested");

  // Sample data for reservations
  const reservations = {
    requested: [
      {
        id: 1,
        driver: "Andrew James",
        participants: 7,
        distance: "9 KM",
        time: "03:00pm to 06:00pm",
        participantName: "John Doe",
        rides: 5,
        image: audi,
        car: "Audi R8",
      },
      {
        id: 2,
        driver: "Sarah Smith",
        participants: 4,
        distance: "15 KM",
        time: "01:00pm to 04:00pm",
        participantName: "Alice Lee",
        rides: 3,
        image: hyundai,
        car: "Hyundai Tucson",
      },
    ],
    ongoing: [
      {
        id: 2,
        driver: "Sarah Smith",
        participants: 4,
        distance: "15 KM",
        time: "01:00pm to 04:00pm",
        participantName: "Alice Lee",
        rides: 3,
        image: hyundai,
        car: "Hyundai Tucson",
      },
      {
        id: 3,
        driver: "Andrew James",
        participants: 7,
        distance: "9 KM",
        time: "03:00pm to 06:00pm",
        participantName: "John Doe",
        rides: 5,
        image: audi,
        car: "Audi R8",
      },
    ],
    completed: [
      {
        id: 3,
        driver: "Michael Brown",
        participants: 5,
        distance: "20 KM",
        time: "09:00am to 11:00am",
        participantName: "Bob White",
        rides: 7,
        image: van,
        car: "Ford Van",
      },
    ],
  };

  // Function to handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Navigate hook for handling navigation
  const navigate = useNavigate();

  // Function to handle card click and navigate to reservation details
  const handleCardClick = (reservationId) => {
    // navigate(`/app/reservation-details/${reservationId}`);
    navigate(`/app/reservation-details`);

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

      {/* Grid Layout for Reservation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {reservations[activeTab].map((car) => (
          <div
            key={car.id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col cursor-pointer"
            onClick={() => handleCardClick(car.id)} // Handle card click
          >
            {/* Driver Info */}
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/10.jpg"
                alt="Driver"
                className="w-10 h-10 rounded-full object-contain"
              />
              <span className="text-sm font-semibold text-gray-800">{car.driver}</span>
            </div>

            {/* Top row: Driver Info + Car Image */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm flex items-center font-semibold text-gray-800 border border-black rounded-full px-2 py-1">
                  <IoCarSportOutline className="mr-1 text-xl" />
                  {car.car}
                </span>
              </div>
              <img
                src={car.image}
                alt={car.driver}
                className="w-32 h-24 object-contain"
              />
            </div>

            {/* Ride Info */}
            <div className="flex items-center gap-6 mt-4 text-gray-700 text-sm font-medium">
              <div className="flex items-center gap-1">
                <FaUsers className="text-blue-500" /> {car.participants}
              </div>
              <div className="flex items-center gap-1">
                <FaLocationDot className="text-green-500" /> {car.distance}
              </div>
              <div className="flex items-center gap-1">
                <BsClock className="text-orange-500" /> {car.time}
              </div>
            </div>

            {/* Bottom Details */}
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <div>
                <p className="text-xs text-gray-500">Participant Name</p>
                <p className="font-semibold text-gray-800">{car.participantName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">No. of Rides</p>
                <p className="font-semibold text-gray-800">{car.rides.toString().padStart(2, "0")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
