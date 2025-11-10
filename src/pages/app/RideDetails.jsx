import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export"; // Static image for car

const RideDetails = () => {
  // Static data for the ride
  const ride = {
    user: {
      name: "John Doe",
      profilePicture: null, // User has no profile picture
    },
    vehicle: {
      make: "Tesla",
      model: "Model 3",
      vehicleName: "Tesla Model 3",
      vehicleType: "Electric",
      image: audi, // Static car image
    },
    vehicleSeat: 4,
    startDate: "2025-10-25T10:00:00",
    vehicleReturnDate: "2025-10-25T12:00:00",
    beforeQuestionnaire: {
      answer: "I’m excited to drive the Tesla for the first time!",
      picture: "https://placehold.co/600x400", // Placeholder image for before ride
    },
    afterQuestionnaire: {
      answer: "It was an incredible experience, the drive was smooth and fast!",
      picture: "https://placehold.co/600x400", // Placeholder image for after ride
    },
    status: "completed", // Ride status (you can set it dynamically based on actual data)
  };

  return (
    <div className="min-h-screen p-6 pt-0">
      <h1 className="text-2xl font-semibold pb-6 text-gray-800">Reservation Details</h1>

      {/* Ride Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 relative">
        {/* Completed Status */}
        {ride.status === "completed" && (
          <div className="absolute top-4 right-4 bg-green-500 text-white py-1 px-4 rounded-full text-xs font-semibold">
            Completed
          </div>
        )}

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
          <span className="text-sm font-semibold text-gray-800">{ride?.user?.name}</span>
        </div>

        {/* Car Info */}
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
            className="w-36 h-24 object-contain"
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

       {/* Before & After Questionnaire */}
<div className="mt-6 flex gap-6">
  {/* Before Questionnaire */}
  {ride.beforeQuestionnaire && (
    <div className="flex-1 text-sm text-gray-600">
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

  {/* After Questionnaire */}
  {ride.afterQuestionnaire && (
    <div className="flex-1 text-sm text-gray-600">
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
</div>

      </div>
    </div>
  );
};

export default RideDetails;
