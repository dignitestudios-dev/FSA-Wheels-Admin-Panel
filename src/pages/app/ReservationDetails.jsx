import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  FaUsers,
  FaGasPump,
  FaWind,
  FaCarCrash,
  FaBroom,
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { TiWarning } from "react-icons/ti";
import { SiTicktick } from "react-icons/si";
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
import { audi } from "../../assets/export";

const ReservationDetails = () => {
  const { state: reservation } = useLocation();
  const navigate = useNavigate();

 const formatDateTime = (d) =>
  new Date(d).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  useEffect(() => {
    if (!reservation) navigate("/app/reservations");
  }, [reservation, navigate]);

  if (!reservation) return null;

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    reservation.vehicle?._id || ""
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  // 🔹 Fetch available vehicles
  const fetchVehicles = async () => {
    try {
      const res = await axios.get("/admin/vehicles");
      if (res.data.success && Array.isArray(res.data.data)) {
        setVehicles(res.data.data);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      ErrorToast("Failed to fetch vehicles.");
    }
  };

  const openApproveModal = async () => {
    setIsApproveModalOpen(true);
    await fetchVehicles();
  };

  const closeApproveModal = () => setIsApproveModalOpen(false);
  const openDeclineModal = () => setIsDeclineModalOpen(true);
  const closeDeclineModal = () => setIsDeclineModalOpen(false);

  // 🔹 Approve
  const handleApprove = async () => {
      setLoading(true);  // Start loading

    try {
      const payload = {
        action: "approved",
        reservationId: reservation._id,
      };

      if (selectedVehicleId && selectedVehicleId !== reservation.vehicle?._id) {
        payload.vehicleId = selectedVehicleId;
      }

      const res = await axios.post("/admin/reservations/update", payload);
      if (res.data.success) {
        SuccessToast("Reservation approved successfully!");
        closeApproveModal();
        setTimeout(() => navigate("/app/reservations"), 1000);
      } else {
        ErrorToast(res.data.message || "Failed to approve reservation.");
      }
    } catch (error) {
      console.error("Approval failed:", error);
      ErrorToast("Failed to approve reservation.");
    }
    finally {
    setLoading(false);  // End loading
  }
  };

  // 🔹 Decline
  const handleDecline = async () => {
      setLoading(true);  // Start loading

    try {
      const payload = {
        action: "rejected",
        reservationId: reservation._id,
      };

      const res = await axios.post("/admin/reservations/update", payload);
      if (res.data.success) {
        SuccessToast("Reservation declined.");
        closeDeclineModal();
        setTimeout(() => navigate("/app/reservations"), 1000);
      } else {
        ErrorToast(res.data.message || "Failed to decline reservation.");
      }
    } catch (error) {
      console.error("Rejection failed:", error);
      ErrorToast("Failed to decline reservation.");
    }
    finally {
    setLoading(false);  // End loading
  }
  };

  return (
    <div className="min-h-screen p-6 pt-0">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 pb-6">
        Reservation Details
      </h1>

      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
        {/* USER INFO */}
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <div className="flex items-center gap-4">
            {reservation.user?.profilePicture ? (
              <img
                src={reservation.user.profilePicture}
                alt={reservation.user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-medium">
                {reservation.user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-800">{reservation.user.name}</p>
              <p className="text-sm text-gray-500">{reservation.user.email}</p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
              reservation.status === "approved"
                ? "bg-green-100 text-green-700"
                : reservation.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {reservation.status}
          </span>
        </div>

        {/* VEHICLE INFO */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <IoCarSportOutline className="text-blue-500" />{" "}
              {reservation.vehicle
                ? `${reservation.vehicle.make} ${reservation.vehicle.model}`
                : "Vehicle Not Assigned"}
            </h2>
            {reservation.vehicle && (
              <p className="text-sm text-gray-500">
                {reservation.vehicle.vehicleName} • {reservation.vehicle.vehicleType}
              </p>
            )}
          </div>
          <img
            src={reservation.vehicle?.image || audi}
            alt={reservation.vehicle?.vehicleName || "Car"}
            className="w-36 h-28 object-cover rounded-lg border"
          />
        </div>

        {/* RIDE INFO */}
       {/* RIDE INFO */}
<div className="p-6 bg-gray-50 grid md:grid-cols-2 gap-3 text-gray-700 border-b">
  <div className="flex items-center gap-2">
    <FaUsers className="text-blue-500" />
    {reservation.vehicleSeat} Seats
  </div>
  <div className="flex items-center gap-2">
    <BsClockHistory className="text-orange-500" />
    Date & Time:{" "}
    {/* {new Date(reservation.startDate).toLocaleString()} →{" "} */}
        {/* {Date(reservation.startDate)} */}

    {/* {new Date(reservation.vehicleReturnDate).toLocaleString()} */}
        {/* {Date(reservation.vehicleReturnDate)} */}
 
     <div>
 <div>
  {formatDateTime(reservation.startDate)}{" to "}
  {formatDateTime(reservation.vehicleReturnDate)}
</div>


</div>


  </div>
  <div className="flex items-center gap-2">
    <GiPathDistance className="text-blue-600" />
    Total Distance: <strong>{reservation.totalDistance || 0} km</strong>
  </div>

  {/* CONDITIONAL REASON */}
  {reservation.isUnableToReturn && reservation.reasonToUnableToReturn && (
  <div className="col-span-2 bg-red-50 border-l-4 border-red-500 rounded-md p-4 flex items-start gap-3 shadow-sm">
    <div className="flex-shrink-0">
      <TiWarning className="text-2xl text-red-600 mt-0.5" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-red-800 mb-1">
        Unable to Return Reason :
      </h4>
      <p className="text-sm text-red-700 leading-snug">
        {reservation.reasonToUnableToReturn}
      </p>
    </div>
  </div>
)}

</div>


        {/* ACTION BUTTONS (Only if Pending) */}
        {reservation.status === "pending" && (
          <div className="flex justify-center gap-6 py-5 bg-gray-50 border-t">
            <button
              onClick={openApproveModal}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-xl transition-all w-40 shadow-md"
            >
              Approve
            </button>
            <button
              onClick={openDeclineModal}
              className="bg-red-600 hover:bg-red-700 text-white py-2.5 px-6 rounded-xl transition-all w-40 shadow-md"
            >
              Decline
            </button>
          </div>
        )}
      </div>

      {/* ✅ APPROVE MODAL */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col items-center mb-4">
              <SiTicktick className="text-blue-600 text-6xl mb-2" />
              <h2 className="text-lg font-semibold text-gray-900 text-center">
                Approve Reservation
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Approve with the current car or choose another one below.
              </p>
            </div>

            {/* CURRENT CAR */}
            {reservation.vehicle && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Currently Assigned Car
                </h3>
                <div className="flex gap-4 items-center">
                  <img
                    src={reservation.vehicle.image}
                    alt={reservation.vehicle.vehicleName}
                    className="w-28 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {reservation.vehicle.make} {reservation.vehicle.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {reservation.vehicle.vehicleType} •{" "}
                      {reservation.vehicle.seats} Seats
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CUSTOM DROPDOWN */}
            <div className="relative">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Select Another Car
              </h3>

              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-gray-300 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all"
              >
                {selectedVehicleId ? (
                  (() => {
                    const car = vehicles.find((v) => v._id === selectedVehicleId);
                    return (
                      <div className="flex items-center gap-3">
                        <img
                          src={car?.image}
                          alt={car?.vehicleName}
                          className="w-12 h-10 object-cover rounded-md border"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {car?.make} {car?.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            {car?.vehicleType} • {car?.seats} Seats
                          </p>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <span className="text-gray-500 text-sm">Select a car...</span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-600 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {dropdownOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
                  {vehicles.map((v) => (
                    <div
                      key={v._id}
                      onClick={() => {
                        setSelectedVehicleId(v._id);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-50 transition-all ${
                        selectedVehicleId === v._id ? "bg-blue-100" : ""
                      }`}
                    >
                      <img
                        src={v.image}
                        alt={v.vehicleName}
                        className="w-14 h-10 object-cover rounded-md border"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {v.make} {v.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          {v.vehicleName} • {v.vehicleType}
                        </p>
                        <p className="text-xs text-gray-500">{v.seats} Seats</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={closeApproveModal}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                          disabled={loading}

                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all"
              >
          {loading ? 'Approving...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ❌ DECLINE MODAL */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <div className="flex flex-col items-center mb-4">
              <TiWarning className="text-red-600 text-5xl mb-3" />
              <h2 className="text-lg font-medium text-gray-800 text-center">
                Are you sure you want to decline this reservation?
              </h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={closeDeclineModal}
                          disabled={loading}

                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-md"
              >
                No
              </button>
              <button
                onClick={handleDecline}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md"
              >
          {loading ? 'Declining...' : 'Decline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
