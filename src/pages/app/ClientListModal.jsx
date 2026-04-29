import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export";
import { useNavigate } from "react-router";
import axios from "../../axios";
import CustomLoader from "../../components/global/CustomLoader";
import { Download } from "lucide-react";

const ClientListModal = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driverLoading, setDriverLoading] = useState(false);
  const [driverPage, setDriverPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState(null);


  const tabs = ["approved", "rejected", "cancelled", "completed", "issues"];

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/admin/reservations?status=${activeTab}`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setReservations(response.data.data);
        } else {
          setReservations([]);
          setError("No reservations found.");
        }
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("An error occurred while fetching reservations.");
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [activeTab]);

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
  console.log("Reservations:", reservations);

  const handleExportCSV = async () => {
    try {
      const res = await axios.get(
        `/admin/report/download?status=${activeTab}`,
        {
          responseType: "blob", // required for file download
        }
      );

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `reservations-${activeTab}-${Date.now()}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV export failed:", error);
    }
  };


  useEffect(() => {
    if (!showDriverModal) return;

    const fetchDrivers = async () => {
      try {
        setDriverLoading(true);

        const res = await axios.get("/user", {
          params: {
            page: driverPage,
            limit: 10,
            search: search,
            active: true, // optional but matches Users component
          },
        });

        const { data } = res;

        setDrivers(data.data.users || []);
        setTotalPages(Math.ceil((data.data.total || 0) / 10));
      } catch (err) {
        console.error("Error fetching drivers:", err);
      } finally {
        setDriverLoading(false);
      }
    };

    fetchDrivers();
  }, [driverPage, debouncedSearch, showDriverModal]);

  const handleAssignDriver = async (driverId) => {
    try {
      await axios.post(`/admin/reservations/assign-driver`, {
        reservationId: selectedReservation._id,
        driverId,
      });

      setShowDriverModal(false);
    } catch (err) {
      console.error("Assign driver failed:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDriverPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Custom Skeleton Loader for the driver list
const CustomSkeletonLoader = () => {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg animate-pulse">
          {/* Skeleton for Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          
          {/* Skeleton for text */}
          <div className="w-full">
            <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
            <div className="w-1/2 h-3 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Tabs */}

      <div className="flex justify-between items-center border-b pb-4">
        {/* Left: Title */}
        <h1 className="text-2xl font-semibold text-gray-800 pt-3">
          Reservations
        </h1>

        {/* Right: Tabs + Export */}
        <div className="flex items-center space-x-6">
          {/* Tabs */}
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-2 px-4 text-sm font-semibold capitalize transition ${activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            <Download size={16} />
            <span className="text-sm font-medium">Export CSV</span>
          </button>
        </div>
      </div>


      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CustomLoader key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          No {activeTab} reservations available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col cursor-pointer"
              onClick={() => handleCardClick(reservation)}
            >
              {/* Driver Info */}
              <div className="flex items-center justify-between w-full">
  
  {/* LEFT SIDE (user info) */}
  <div className="flex items-center gap-3">
    {reservation?.user?.profilePicture ? (
      <img
        src={reservation.user.profilePicture}
        alt={reservation?.user?.name || "User"}
        className="w-10 h-10 rounded-full object-contain"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
        {reservation?.user?.name
          ?.split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()}
      </div>
    )}

    <span className="text-sm font-semibold text-gray-800">
      {reservation?.user?.name}
    </span>
  </div>

  {/* RIGHT SIDE (button) */}
  {reservation.status === "completed" && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setSelectedReservation(reservation);
        setShowDriverModal(true);
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
    >
      Assign Driver
    </button>
  )}

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
                      {reservation.vehicle.vehicleName} •{" "}
                      {reservation.vehicle.vehicleType}
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
                <div className="flex items-center gap-1">
                  <BsClock className="text-orange-500" />
                  {new Date(reservation.startDate).toLocaleTimeString()} -{" "}
                  {new Date(reservation.vehicleReturnDate).toLocaleTimeString()}
                </div>
              </div>

              {/* Status Info */}
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="font-semibold text-gray-500">Status</p>
                <p
                  className={`font-semibold capitalize ${reservation.status === "approved"
                      ? "text-green-600"
                      : reservation.status === "rejected"
                        ? "text-red-600"
                        : reservation.status === "cancelled"
                          ? "text-gray-500"
                          : reservation.status === "completed"
                            ? "text-blue-600"
                            : "text-yellow-600"
                    }`}
                >
                  {reservation.status}
                </p>

              </div>
            </div>
          ))}
        </div>
      )}

      {showDriverModal && (
  <div className="fixed -inset-20 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 flex flex-col max-h-[80vh]">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Assign Driver
        </h2>
        <button
          onClick={() => setShowDriverModal(false)}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

    {selectedReservation && (
  <div className="mb-4 p-4 border rounded-xl bg-gray-50">
    
    {/* Top Row: Vehicle + Status */}
    <div className="flex justify-between items-start mb-3">
      
      {/* Vehicle Info + Image */}
      <div className="flex items-center gap-3">
        <img
          src={selectedReservation.vehicle?.image || audi}
          alt="vehicle"
          className="w-14 h-10 object-contain"
        />

        <div>
          <p className="text-sm font-semibold text-gray-800">
            {selectedReservation?.vehicle
              ? `${selectedReservation.vehicle.make} ${selectedReservation.vehicle.model}`
              : "Vehicle Not Assigned"}
          </p>

          <p className="text-xs text-gray-500">
            {selectedReservation?.vehicle?.vehicleName} •{" "}
            {selectedReservation?.vehicle?.vehicleType}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <span
        className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${
          selectedReservation.status === "approved"
            ? "bg-green-100 text-green-600"
            : selectedReservation.status === "rejected"
            ? "bg-red-100 text-red-600"
            : selectedReservation.status === "cancelled"
            ? "bg-gray-200 text-gray-600"
            : selectedReservation.status === "completed"
            ? "bg-blue-100 text-blue-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {selectedReservation.status}
      </span>
    </div>

    {/* Bottom Grid */}
    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
      
      {/* Client */}
      <div>
        <p className="text-xs text-gray-400">Client</p>
        <p className="font-medium text-gray-800">
          {selectedReservation?.user?.name || "-"}
        </p>
      </div>

      {/* Seats */}
      <div>
        <p className="text-xs text-gray-400">Seats</p>
        <p className="font-medium text-gray-800">
          {selectedReservation.vehicleSeat || "-"}
        </p>
      </div>

      {/* Time */}
      <div className="col-span-2">
        <p className="text-xs text-gray-400">Time</p>
        <p className="font-medium text-gray-800">
          {new Date(selectedReservation.startDate).toLocaleTimeString()} -{" "}
          {new Date(
            selectedReservation.vehicleReturnDate
          ).toLocaleTimeString()}
        </p>
      </div>
    </div>
  </div>
)}

      {/* Search */}
      <input
        type="text"
        placeholder="Search drivers..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setDriverPage(1);
        }}
        className="w-full border rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Driver List */}
      {/* Driver List */}
<div className="space-y-2 overflow-y-auto flex-1 pr-1">
  {driverLoading ? (
    <CustomSkeletonLoader />
  ) : drivers.length === 0 ? (
    <p className="text-center text-gray-500">No drivers found</p>
  ) : (
    drivers.map((driver) => {
      const isSelected = selectedDriverId === driver._id;

      return (
        <div
          key={driver._id}
          onClick={() => {
            // Toggle the selection
            setSelectedDriverId(isSelected ? null : driver._id);
          }}
          className={`flex justify-between items-center border rounded-lg p-3 cursor-pointer transition ${
            isSelected
              ? "border-blue-600 bg-blue-50"
              : "hover:bg-gray-50"
          }`}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            {driver.profilePicture ? (
              <img
                src={driver.profilePicture}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {driver.name?.[0]}
              </div>
            )}

            <div>
              <p className="text-sm font-medium">{driver.name}</p>
              <p className="text-xs text-gray-500">{driver.email}</p>
            </div>
          </div>

          {/* Right indicator */}
          <div className="text-sm">
            {isSelected ? (
              <span className="text-white bg-blue-600 p-2 rounded-full font-semibold">
                Selected ✓
              </span>
            ) : (
              <span className="text-gray-400">Select</span>
            )}
          </div>
        </div>
      );
    })
  )}
</div>

      {/* Pagination */}
      <div className="flex border-t pt-4 justify-between items-center mt-4">
        <div>
        <button
          disabled={driverPage === 1}
          onClick={() => setDriverPage((prev) => prev - 1)}
          className="px-3 mr-4 bg-blue-500 text-white rounded-lg py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {driverPage} of {totalPages}
        </span>

        <button
          disabled={driverPage === totalPages}
          onClick={() => setDriverPage((prev) => prev + 1)}
          className="px-3 bg-blue-500 text-white rounded-lg ml-4 py-1 disabled:opacity-50"
        >
          Next
        </button>
        
        </div>
        {/* Done Button */}
      <div className=" flex justify-end">
        <button
          disabled={!selectedDriverId}
          onClick={async () => {
            await handleAssignDriver(selectedDriverId);
            setShowDriverModal(false);
            setSelectedDriverId(null);
          }}
          className={`px-5 py-2 rounded-lg text-white text-sm font-medium transition ${
            selectedDriverId
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Done
        </button>
      </div>
      </div>

      

    </div>
  </div>
)}
    </div>
  );
};

export default ClientListModal;
