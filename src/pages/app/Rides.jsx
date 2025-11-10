import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export"; // Static image for car
import { useNavigate } from "react-router"; // Import for navigation

const Rides = () => {
  const [activeTab, setActiveTab] = useState("completed"); // Default tab set to "completed"
  const navigate = useNavigate();

  // Static Data for rides
  const rides = {
    completed: [
      {
        _id: 2,
        user: { name: "Jane Smith", profilePicture: null },
        vehicle: {
          make: "BMW",
          model: "M4",
          vehicleName: "BMW M4",
          vehicleType: "Performance",
          image: audi,
        },
        vehicleSeat: 4,
        startDate: "2025-10-25T09:00:00",
        vehicleReturnDate: "2025-10-25T11:00:00",
        status: "completed",
        beforeQuestionnaire: {
          answer: "I’m excited about this ride! The car looks amazing.",
          picture: "https://placehold.co/600x400", // Dummy picture for before
        },
        afterQuestionnaire: {
          answer: "Great ride, everything was smooth.",
          picture: "https://placehold.co/600x400", // Dummy picture for after
        },
      },
      {
        _id: 3,
        user: { name: "Sam Green", profilePicture: null },
        vehicle: {
          make: "Tesla",
          model: "Model S",
          vehicleName: "Tesla Model S",
          vehicleType: "Electric",
          image: audi,
        },
        vehicleSeat: 5,
        startDate: "2025-10-20T10:00:00",
        vehicleReturnDate: "2025-10-20T12:00:00",
        status: "completed",
        beforeQuestionnaire: {
          answer: "Can’t wait to see how the Tesla performs!",
          picture: "https://placehold.co/600x400", // Dummy picture for before
        },
        afterQuestionnaire: {
          answer: "Loved the smooth electric drive!",
          picture: "https://placehold.co/600x400", // Dummy picture for after
        },
      },
    ],
  };

  // Navigate to the ride details page
  const handleCardClick = (ride) => {
    navigate(`/app/ride-details`, { state: ride });
  };

  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Header */}
      <div className="flex justify-between space-x-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 pt-3">Completed Rides</h1>
        </div>
      </div>

      {/* Ride List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {rides.completed.map((ride) => (
          <div
            key={ride._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col cursor-pointer"
            onClick={() => handleCardClick(ride)}
          >
            {/* Driver Info */}
            <div className="flex items-center gap-3">
              {ride?.user?.profilePicture ? (
                <img
                  src={ride.user.profilePicture}
                  alt={ride?.user?.name || "User"}
                  className="w-10 h-10 rounded-full object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {ride?.user?.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
              )}
              <span className="text-sm font-semibold text-gray-800">
                {ride?.user?.name}
              </span>
            </div>

            {/* Vehicle Info */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold text-gray-800 flex flex-col">
                <span className="flex items-center">
                  <IoCarSportOutline className="text-xl inline-block mr-2" />
                  {ride.vehicle ? `${ride.vehicle.make} ${ride.vehicle.model}` : "Vehicle Not Assigned"}
                </span>
                {ride.vehicle && (
                  <span className="text-sm text-gray-500">
                    {ride.vehicle.vehicleName} • {ride.vehicle.vehicleType}
                  </span>
                )}
              </span>

              <img
                src={ride.vehicle?.image || audi}
                alt={ride.vehicle?.name || "Car"}
                className="w-32 h-24 object-contain"
              />
            </div>

            {/* Ride Info */}
            <div className="flex items-center gap-6 mt-4 text-gray-700 text-sm font-medium">
              <div className="flex items-center gap-1">
                <FaUsers className="text-blue-500" /> {ride.vehicleSeat}
              </div>
              <div className="flex items-center gap-1">
                <BsClock className="text-orange-500" />
                {new Date(ride.startDate).toLocaleTimeString()} -{" "}
                {new Date(ride.vehicleReturnDate).toLocaleTimeString()}
              </div>
            </div>

            {/* Ride Status */}
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <div className="font-semibold text-gray-500">Status</div>
              <div className="text-right font-semibold text-gray-800">
                {ride.status === "in-progress" ? "In Progress" : "Completed"}
              </div>
            </div>

            {/* Before & After Questionnaire */}
            {/* <div className="mt-4">
              {ride.beforeQuestionnaire && (
                <div className="mt-2 text-sm text-gray-600">
                  <h4 className="font-semibold text-gray-800">Before Ride Questionnaire</h4>
                  <p>Answer: {ride.beforeQuestionnaire.answer}</p>
                  {ride.beforeQuestionnaire.picture && (
                    <img
                      src={ride.beforeQuestionnaire.picture}
                      alt="Before Ride Image"
                      className="mt-2 w-32 h-24 object-cover rounded-md shadow-sm"
                    />
                  )}
                </div>
              )}
              {ride.afterQuestionnaire && (
                <div className="mt-2 text-sm text-gray-600">
                  <h4 className="font-semibold text-gray-800">After Ride Questionnaire</h4>
                  <p>Answer: {ride.afterQuestionnaire.answer}</p>
                  {ride.afterQuestionnaire.picture && (
                    <img
                      src={ride.afterQuestionnaire.picture}
                      alt="After Ride Image"
                      className="mt-2 w-32 h-24 object-cover rounded-md shadow-sm"
                    />
                  )}
                </div>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rides;
