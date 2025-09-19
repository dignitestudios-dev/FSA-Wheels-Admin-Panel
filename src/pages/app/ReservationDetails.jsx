import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi,hyundai,van } from "../../assets/export"; // Adding more cars for selection
import { TiWarning } from "react-icons/ti";



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

  // State to manage modals
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(reservation.car);

  // Handle car selection in approve modal
  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  // Open and close modals
  const openApproveModal = () => setIsApproveModalOpen(true);
  const closeApproveModal = () => setIsApproveModalOpen(false);
  const openDeclineModal = () => setIsDeclineModalOpen(true);
  const closeDeclineModal = () => setIsDeclineModalOpen(false);

  const handleApprove = () => {
    // Handle approval logic here, such as updating the status or calling an API.
    console.log(`Approved the reservation with ${selectedCar}`);
    closeApproveModal();
  };

  const handleDecline = () => {
    // Handle decline logic here, such as updating the status or calling an API.
    console.log(`Declined the reservation.`);
    closeDeclineModal();
  };

  return (
    <div className="min-h-screen p-6 pt-0 ">
      <h1 className="text-2xl font-semibold pb-6 text-gray-800">Reservation Details</h1>

      {/* Reservation Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Driver Info */}
          <div className="flex justify-between items-center p-6 bg-gray-100">
  {/* Driver Info */}
  <div className="flex items-center gap-4">
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

  {/* Completed Status */}
  <div className="bg-yellow-300 text-white px-3 py-2 border border-gray-200 text-xs rounded-full font-medium">
    Pending
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
          <button
            onClick={openApproveModal}
            className="bg-blue-500 text-white py-2 px-6 rounded-2xl hover:bg-blue-700 transition-all w-40"
          >
            Approve
          </button>
          <button
            onClick={openDeclineModal}
            className="bg-red-600 text-white py-2 px-6 rounded-2xl hover:bg-red-700 transition-all w-40"
          >
            Decline
          </button>
        </div>
      </div>

      {/* Approve Modal */}
  {isApproveModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Select Your Car</h2>

      {/* Car Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {['Audi R8', 'BMW M4', 'Tesla Model S'].map((car, index) => (
          <div
            key={car}
            onClick={() => handleCarSelect(car)}
            className={`cursor-pointer bg-white border rounded-xl shadow p-2 flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg
              ${selectedCar === car ? 'border-4 border-blue-500' : 'border-gray-300'}`}
          >
            {/* Car Image */}
            <img
              src={index === 0 ? audi : index === 1 ? hyundai : van} // Replace with actual image sources
              alt={car}
              className="w-full h-24 object-contain rounded-lg mb-4" // Reduced height for smaller cards
            />

            {/* Car Details */}
            <div className="flex flex-col ">
              <h3 className="text-base font-semibold text-gray-800 border-b border-gray-300">{car}</h3>
              <p className="text-sm text-gray-500">{car === "Audi R8" ? "Sporty" : car === "BMW M4" ? "Performance" : "Electric"}</p>
              <div className="flex justify-between items-center text-gray-600 text-sm">
                <span>{car === "Audi R8" ? "2 Seats" : car === "BMW M4" ? "4 Seats" : "5 Seats"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Car Display */}
      {selectedCar && (
        <div className="text-start  text-lg font-semibold text-gray-800 mb-4">
         Selected: <span className="text-blue-600">{selectedCar}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={closeApproveModal}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-md transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleApprove}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}






     {/* Decline Modal */}
{isDeclineModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <div className="flex flex-col items-center justify-center mb-4">
        {/* Warning Icon */}

        <TiWarning className="text-red-600  bg font-bold text-3xl mb-4" />
        <h2 className="text-xl font-medium text-gray-800">Are you sure you want to decline?</h2>
      </div>
      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={closeDeclineModal}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md transition-all"
        >
          No
        </button>
        <button
          onClick={handleDecline}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-all"
        >
          Yes, Decline
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ReservationDetails;
