import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export"; // Assuming you want to show a single car for the reservation

const ReservationDetails = () => {
  const reservation = {
    id: 1,
    driver: "Andrew James",
    participants: 7,
    distance: "9 KM",
    time: "03:00pm to 06:00pm",
    participantName: "John Doe",
    rides: 5,
    image: audi,
    car: "Audi R8",
    from: "New York",
    to: "Los Angeles",
    date: "2025-09-25"
  };

  return (
    <div className=" min-h-screen p-6 pt-0 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800 ">Reservation Details</h1>

      {/* Reservation Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        
        {/* Driver Info */}
        <div className="flex items-center gap-4 p-6 bg-gray-100">
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="Driver"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="text-gray-700 font-semibold">{reservation.driver}</p>
            <p className="text-gray-500">Driver</p>
          </div>
        </div>

        {/* Car Info and Image */}
        <div className="flex justify-between items-center p-6 bg-white border-t">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-800">
              <IoCarSportOutline className="text-xl inline-block mr-2" />
              {reservation.car}
            </span>
          </div>
          <img
            src={reservation.image}
            alt={reservation.car}
            className="w-36 h-24 object-contain"
          />
        </div>

        {/* Ride Timeline */}
        <div className="p-6 bg-gray-50 border-t">
          <p className="text-gray-700 text-sm font-medium">Ride Details</p>
          <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-500" />
              {reservation.participants} Passengers
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-green-500" />
              {reservation.from} → {reservation.to}
            </div>
            <div className="flex items-center gap-2">
              <BsClock className="text-orange-500" />
              {reservation.time}
            </div>
          </div>
        </div>

        {/* Timeline of the Ride */}
        <div className="px-6 py-4 bg-gray-100 border-t">
          <p className="text-gray-700 text-sm font-medium">Timeline</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">Scheduled</span>
              <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">On the Way</span>
              <div className="h-3 w-3 bg-gray-300 rounded-full mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">Arrived</span>
              <div className="h-3 w-3 bg-gray-300 rounded-full mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">Completed</span>
              <div className="h-3 w-3 bg-gray-300 rounded-full mt-1"></div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="p-6 bg-white border-t flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Participant Name</p>
            <p className="font-semibold text-gray-800">{reservation.participantName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">No. of Rides</p>
            <p className="font-semibold text-gray-800">{reservation.rides.toString().padStart(2, "0")}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 py-4 bg-gray-50 border-t">
          <button className="bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition-all w-40">
            Approve
          </button>
          <button className="bg-red-600 text-white py-2 px-6 rounded-xl hover:bg-red-700 transition-all w-40">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
