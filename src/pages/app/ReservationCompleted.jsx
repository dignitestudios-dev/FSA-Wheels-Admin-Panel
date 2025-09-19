import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export"; // Replace with real paths

const ReservationCompleted = () => {
  const reservation = {
    id: 1,
    driver: "Andrew James",
    participants: 7,
    distance: "50 KM",
    time: "03:00 PM - 06:00 PM",
    participantName: "John Doe",
    rides: 5,
    car: "Audi R8",
    from: "New York",
    to: "Los Angeles",
    date: "2025-09-25",

    // Before and after car condition
    beforeImage: audi,
    afterImage: audi,
    mileageBefore: "50,000 KM",
    mileageAfter: "50,050 KM",
    fuelBefore: "Full",
    fuelAfter: "Half",
  };

  return (
    <div className="min-h-screen p-6 pt-0">
      <h1 className="text-2xl font-semibold pb-6 text-gray-800">Completed Reservation</h1>

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
  <div className="bg-green-100 text-green-700 px-3 py-2 border border-gray-200 text-xs rounded-full font-medium">
    Completed
  </div>
</div>


        {/* Car Info */}
        <div className="flex justify-between items-center p-6 border-t">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-800">
              <IoCarSportOutline className="text-xl inline-block mr-2" />
              {reservation.car}
            </span>
          </div>
          <img
            src={reservation.beforeImage}
            alt="Car"
            className="w-36 h-24 object-contain"
          />
        </div>

        {/* Trip Info */}
        <div className="p-6 bg-gray-50 border-t">
          <p className="text-gray-700 text-sm font-medium">Trip Details</p>
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

        {/* Participant and Ride Info */}
        <div className="p-6 bg-white border-t flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Participant</p>
            <p className="font-semibold text-gray-800">{reservation.participantName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Rides</p>
            <p className="font-semibold text-gray-800">
              {reservation.rides.toString().padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Car Condition Before & After */}
        <div className="p-6 bg-white border-t">
          <p className="text-gray-700 text-sm font-medium mb-4">Car Condition Before & After</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Ride */}
            <div className="bg-gray-50 p-4 rounded-xl border">
              <h4 className="font-semibold text-gray-800 mb-2">Before Ride</h4>
              <img
                src={reservation.beforeImage}
                alt="Before Ride"
                className="w-full h-40 object-contain rounded mb-4"
              />
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Mileage:</strong> {reservation.mileageBefore}</li>
                <li><strong>Fuel Level:</strong> {reservation.fuelBefore}</li>
              </ul>
            </div>

            {/* After Ride */}
            <div className="bg-gray-50 p-4 rounded-xl border">
              <h4 className="font-semibold text-gray-800 mb-2">After Ride</h4>
              <img
                src={reservation.afterImage}
                alt="After Ride"
                className="w-full h-40 object-contain rounded mb-4"
              />
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Mileage:</strong> {reservation.mileageAfter}</li>
                <li><strong>Fuel Level:</strong> {reservation.fuelAfter}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0893F0] text-white py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-2 border-t">
  <div className="flex items-center gap-2 text-sm">
    {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M4 19h16M4 15h16M9 11v8m6-8v8" />
    </svg> */}
    <span>Reservation Completed</span>
  </div>
  <div className="text-sm font-semibold">
    {reservation.date}
  </div>
</div>

      </div>
    </div>
  );
};

export default ReservationCompleted;
