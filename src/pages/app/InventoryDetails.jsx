import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaUsers, FaArrowLeft } from "react-icons/fa";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import CustomLoader from "../../components/global/CustomLoader";

const InventoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH INVENTORY DETAILS ---------------- */
  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(`/vehicles/${id}`);

      if (response.data.success) {
        setVehicle(response.data.data);
      } else {
        ErrorToast("Failed to fetch inventory details.");
      }
    } catch (error) {
      console.error("Fetch vehicle details error:", error);
      ErrorToast("An error occurred while fetching inventory details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchVehicleDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <CustomLoader />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-6 text-center text-gray-500">
        Inventory not found
      </div>
    );
  }

  return (
    <div className="p-6 pt-0">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Inventory Details
        </h1>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow p-6">
        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <img
            src={vehicle.image}
            alt={vehicle.vehicleName}
            className="h-64 object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Detail label="Vehicle Name" value={vehicle.vehicleName} />
          <Detail label="Type" value={vehicle.vehicleType} />
          <Detail label="Make" value={vehicle.make || "—"} />
          <Detail label="Model" value={vehicle.model || "—"} />

          <div className="flex items-center gap-2 text-gray-700">
            <FaUsers className="text-blue-600" />
            <span>{vehicle.seats} seats</span>
          </div>

          <Detail
            label="Created At"
            value={new Date(vehicle.createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
};

/* ---------------- REUSABLE DETAIL ---------------- */
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

export default InventoryDetails;
