import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi, hyundai, van } from "../../assets/export";
import { TiWarning } from "react-icons/ti";
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster"; // Optional
import { SiTicktick } from "react-icons/si";

const ReservationDetails = () => {
  const { state: reservation } = useLocation();
  const navigate = useNavigate();

  console.log("Reservation Data:", reservation);

  // Redirect if no reservation data was passed
  useEffect(() => {
    if (!reservation) {
      navigate("/app/reservations");
    }
  }, [reservation, navigate]);

  if (!reservation) return null; // Prevent rendering until redirect happens

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(reservation.vehicle?.name || "Audi R8");

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const openApproveModal = () => setIsApproveModalOpen(true);
  const closeApproveModal = () => setIsApproveModalOpen(false);
  const openDeclineModal = () => setIsDeclineModalOpen(true);
  const closeDeclineModal = () => setIsDeclineModalOpen(false);

 const handleApprove = async () => {
  try {
    const res = await axios.patch(`/reservations/${reservation._id}/status`, {
      status: "approved",
    });

    SuccessToast("Reservation approved successfully!");

    closeApproveModal();

    // Optional: Redirect after approval
    setTimeout(() => {
      navigate("/app/reservations");
    }, 1000);
  } catch (error) {
    console.error("Approval failed:", error);
    ErrorToast(error?.response?.data?.message || "Failed to approve reservation.");
  }
};


const handleDecline = async () => {
  try {
    const res = await axios.patch(`/reservations/${reservation._id}/status`, {
      status: "rejected",
    });

    SuccessToast("Reservation rejected.");

    closeDeclineModal();

    // Optional: Redirect after rejection
    setTimeout(() => {
      navigate("/app/reservations");
    }, 1000);
  } catch (error) {
    console.error("Rejection failed:", error);
    ErrorToast(error?.response?.data?.message || "Failed to reject reservation.");
  }
};


  return (
    <div className="min-h-screen p-6 pt-0">
      <h1 className="text-2xl font-semibold pb-6 text-gray-800">Reservation Details</h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">

        {/* Driver Info */}
        <div className="flex justify-between items-center p-6 bg-gray-100">
          <div className="flex items-center gap-4">
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
            <div className="text-sm">
              <p className="text-gray-700 font-semibold">{reservation?.user?.name || "Unknown Driver"}</p>
              <p className="text-gray-500">Driver</p>
            </div>
            {/* <div className="text-sm">
              <p className="text-gray-700 font-semibold">{reservation?.user?.totalRides || "Unknown Driver"}</p>
            </div> */}
          </div>
          <div className="bg-yellow-500 text-white px-3 py-2 border border-gray-200 text-xs rounded-full font-medium">
            {reservation.status || "Pending"}
          </div>
        </div>

        {/* Car Info */}
        <div className="flex justify-between items-center p-6 bg-white border-t">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-800">
              <IoCarSportOutline className="text-xl inline-block mr-2" />
              {reservation.vehicle?.name || "Vehicle Not Assigned"}
            </span>
          </div>
          <img
            src={reservation.vehicle?.image || audi}
            alt={reservation.vehicle?.name || "Car"}
            className="w-36 h-24 object-contain"
          />
        </div>

        {/* Ride Info */}
        <div className="p-6 bg-gray-50 border-t">
          <p className="text-gray-700 text-sm font-medium">Ride Details</p>
          <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-500" />
              {reservation.vehicleSeat || 0} Passengers
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-green-500" />
              Distance: {reservation.totalDistance || 0} KM
            </div>
            <div className="flex items-center gap-2">
              <BsClock className="text-orange-500" />
              {new Date(reservation.startDate).toLocaleTimeString()} -{" "}
              {new Date(reservation.vehicleReturnDate).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Timeline */}
        {/* <div className="px-6 py-4 bg-gray-100 border-t">
          <p className="text-gray-700 text-sm font-medium">Timeline</p>
          <div className="flex items-center justify-between mt-4">
            {["Scheduled", "On the Way", "Arrived", "Completed"].map((step, idx) => (
              <div className="flex flex-col items-center" key={step}>
                <span className="text-xs text-gray-600">{step}</span>
                <div
                  className={`h-3 w-3 rounded-full mt-1 ${
                    idx === 0 ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* Additional Info */}
        {/* <div className="p-6 bg-white border-t flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">User ID</p>
<p className="font-semibold text-gray-800">{reservation.user?.name || "N/A"}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Reservation ID</p>
            <p className="font-semibold text-gray-800">{reservation._id}</p>
          </div>
        </div> */}

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
<div className="flex flex-col items-center justify-center mb-4">
              <SiTicktick  className="text-blue-600 font-bold text-6xl mb-4" />
              <h2 className="text-xl font-medium text-gray-800">Are you sure you want to approve?</h2>
            </div>
            {/* <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Select Your Car</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {["Audi R8", "BMW M4", "Tesla Model S"].map((car, index) => (
                <div
                  key={car}
                  onClick={() => handleCarSelect(car)}
                  className={`cursor-pointer bg-white border rounded-xl shadow p-2 flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg
                    ${selectedCar === car ? "border-4 border-blue-500" : "border-gray-300"}`}
                >
                  <img
                    src={index === 0 ? audi : index === 1 ? hyundai : van}
                    alt={car}
                    className="w-full h-24 object-contain rounded-lg mb-4"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-gray-800 border-b border-gray-300">{car}</h3>
                    <p className="text-sm text-gray-500">
                      {car === "Audi R8"
                        ? "Sporty"
                        : car === "BMW M4"
                        ? "Performance"
                        : "Electric"}
                    </p>
                    <div className="text-gray-600 text-sm">
                      {car === "Audi R8"
                        ? "2 Seats"
                        : car === "BMW M4"
                        ? "4 Seats"
                        : "5 Seats"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCar && (
              <div className="text-start text-lg font-semibold text-gray-800 mb-4">
                Selected: <span className="text-blue-600">{selectedCar}</span>
              </div>
            )} */}

            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={closeApproveModal}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-md transition-all"
              >
                No
              </button>
              <button
                onClick={handleApprove}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {isDeclineModalOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex flex-col items-center justify-center mb-4">
              <TiWarning className="text-red-600 font-bold text-6xl mb-4" />
              <h2 className="text-xl font-medium text-gray-800">Are you sure you want to decline?</h2>
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={closeDeclineModal}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-md transition-all"
              >
                No
              </button>
              <button
                onClick={handleDecline}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-all"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
