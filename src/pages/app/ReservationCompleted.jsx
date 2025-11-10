import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaUsers, FaGasPump, FaWind, FaCarCrash, FaBroom, FaRegCalendarCheck } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { TiWarning } from "react-icons/ti";
import axios from "../../axios";

const ReservationCompleted = () => {
  const { state: reservation } = useLocation();
  console.log("Reservation state:", reservation);
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true); // Step 1: Add loading state

  useEffect(() => {
    if (!reservation) {
      navigate("/app/reservations");
    } else {
      fetchReservationDetails(reservation._id);
    }
  }, [reservation, navigate]);

  const fetchReservationDetails = async (id) => {
    try {
      const res = await axios.get(`/admin/reservations`);
      if (res.data.success && Array.isArray(res.data.data)) {
        const found = res.data.data.find((r) => r._id === id);
        setReservationData(found);
      }
    } catch (err) {
      console.error("Error fetching reservation details:", err);
    } finally {
      setLoading(false); // Step 2: Set loading to false after data fetch
    }
  };

  // Step 3: Show loading state until reservationData is fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading reservation details...
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Reservation not found.
      </div>
    );
  }

  const r = reservation;
  const v = r.vehicle;
  const vs = r.vehicleStats;

  return (
    <div className="min-h-screen p-6 pt-0">
      <h1 className="text-3xl font-bold pb-6 text-gray-800 flex items-center gap-3">
        Reservation Details
      </h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        {/* USER DETAILS */}
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <div className="flex items-center gap-4">
            {r.user?.profilePicture ? (
              <img
                src={r.user.profilePicture}
                alt={r.user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-medium">
                {r.user?.name
                  ?.split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-lg text-gray-800">{r.user?.name}</p>
              <p className="text-gray-500 text-sm">{r.user?.email}</p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
              r.status === "approved"
                ? "bg-green-100 text-green-700"
                : r.status === "rejected"
                ? "bg-red-100 text-red-700"
                : r.status === "completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {r.status}
          </span>
        </div>

        {/* VEHICLE DETAILS */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <IoCarSportOutline className="text-blue-500" /> {v?.make} {v?.model}
            </h2>
            <p className="text-gray-500 text-sm">
              {v?.vehicleName} • {v?.vehicleType}
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <FaUsers className="text-blue-400" /> {v?.seats} Seats
            </div>
          </div>
          <img
            src={v?.image}
            alt={v?.vehicleName}
            className="w-40 h-28 object-cover rounded-lg border"
          />
        </div>

        {/* RIDE INFO */}
        <div className="p-6 bg-gray-50 border-b grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-700">
            <BsClockHistory className="text-orange-500 text-lg" />
            <span>
              <strong>Start:</strong> {new Date(r.startDate).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaRegCalendarCheck className="text-green-600 text-lg" />
            <span>
              <strong>Return:</strong> {new Date(r.vehicleReturnDate).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <GiPathDistance className="text-blue-600 text-lg" />
            <span>
              <strong>Distance:</strong> {r.totalDistance} km
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MdAirlineSeatReclineExtra className="text-purple-600 text-lg" />
            <span>
              <strong>Vehicle Seats:</strong> {r.vehicleSeat}
            </span>
          </div>
          
        </div>

        {/* VEHICLE CONDITION */}
        <div className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TiWarning className="text-red-500" /> Vehicle Condition Summary
          </h3>

          {vs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FaCarCrash className="text-red-500" />
                <span>
                  <strong>Damaged:</strong> {vs.isDamaged ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaWind className="text-blue-500" />
                <span>
                  <strong>Windshield Intact:</strong>{" "}
                  {vs.isWindshieldIntact ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaBroom className="text-green-600" />
                <span>
                  <strong>Car Clean:</strong> {vs.isCarClean ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaGasPump className="text-yellow-500" />
                <span>
                  <strong>Tank Full on Pickup:</strong>{" "}
                  {vs.isTankFullOnPickup ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MdAirlineSeatReclineExtra className="text-purple-500" />
                <span>
                  <strong>Seats Present:</strong>{" "}
                  {vs.areAssignedCarSeatsPresent ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BsClockHistory className="text-gray-600" />
                <span>
                  <strong>Hand Over Type:</strong> {vs.handOverType}
                </span>
              </div>

              {vs.damagedDescription && (
                <div className="col-span-2 bg-red-50 text-red-700 p-3 rounded-lg mt-2">
                  <strong>Description:</strong> {vs.damagedDescription}
                </div>
              )}

              {vs.tankLevelImage && (
                <div className="col-span-2 mt-3">
                  <p className="font-semibold text-gray-700 mb-2">
                    Tank Level Image:
                  </p>
                  <img
                    src={vs.tankLevelImage}
                    alt="Tank level"
                    className="w-56 h-40 object-cover rounded-lg border"
                  />
                </div>
              )}

               {reservation.isUnableToReturn && reservation.reasonToUnableToReturn && (
                  <div className="flex items-start gap-2 col-span-2 text-red-600">
                    <TiWarning className="text-xl mt-1" />
                    <p>{reservation.reasonToUnableToReturn}</p>
                  </div>
                )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No vehicle stats available for this reservation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCompleted;
