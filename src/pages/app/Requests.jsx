import { useState, useEffect, useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { audi } from "../../assets/export";
import { useNavigate } from "react-router";
import axios from "../../axios";
import CustomLoader from "../../components/global/CustomLoader";
import { Download } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const { setRequestslength } = useContext(AppContext);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `/admin/reservations?status=pending&page=${currentPage}&limit=${itemsPerPage}`
        );

        if (response.data.success) {
          setRequests(response.data.data);
          setRequestslength(response.data.data);

          // ✅ Pagination data from backend
          setTotalPages(response.data.pagination.totalPages);
          setTotalItems(response.data.pagination.totalItems);
        } else {
          setRequests([]);
          setError("No pending requests found.");
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load pending requests.");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [currentPage]);

  const handleCardClick = (reservation) => {
    navigate(`/app/reservation-details`, { state: reservation });
  };

  const handleExportCSV = async () => {
    try {
      const res = await axios.get(
        "/admin/report/download?status=pending",
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `pending-requests-${Date.now()}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV export failed:", error);
    }
  };

  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800 pt-3">
          Pending Requests
        </h1>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
        >
          <Download size={16} />
          <span className="text-sm font-medium">Export CSV</span>
        </button>
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
      ) : requests.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          No pending requests available
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {requests.map((reservation) => (
              <div
                key={reservation._id}
                onClick={() => handleCardClick(reservation)}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col cursor-pointer"
              >
                {/* User */}
                <div className="flex items-center gap-3">
                  {reservation?.user?.profilePicture ? (
                    <img
                      src={reservation.user.profilePicture}
                      alt={reservation.user.name}
                      className="w-10 h-10 rounded-full object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                      {reservation?.user?.name
                        ?.split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-800">
                    {reservation?.user?.name}
                  </span>
                </div>

                {/* Vehicle */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800 flex items-center">
                      <IoCarSportOutline className="mr-2 text-xl" />
                      {reservation.vehicle
                        ? `${reservation.vehicle.make} ${reservation.vehicle.model}`
                        : "Vehicle Not Assigned"}
                    </p>
                    {reservation.vehicle && (
                      <p className="text-sm text-gray-500">
                        {reservation.vehicle.vehicleName} •{" "}
                        {reservation.vehicle.vehicleType}
                      </p>
                    )}
                  </div>
                  <img
                    src={reservation.vehicle?.image || audi}
                    alt="Vehicle"
                    className="w-32 h-24 object-contain"
                  />
                </div>

                {/* Ride Info */}
                <div className="flex items-center gap-6 mt-4 text-gray-700 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-blue-500" />
                    {reservation.vehicleSeat}
                  </div>
                  <div className="flex items-center gap-1">
                    <BsClock className="text-orange-500" />
                    {new Date(reservation.startDate).toLocaleTimeString()} -{" "}
                    {new Date(
                      reservation.vehicleReturnDate
                    ).toLocaleTimeString()}
                  </div>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <span className="font-semibold text-gray-500">Status</span>
                  <span className="font-semibold text-yellow-600 capitalize">
                    pending
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Showing text */}
          {/* <div className="text-center text-sm text-gray-500 mt-6">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
            {totalItems} results
          </div> */}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Requests;