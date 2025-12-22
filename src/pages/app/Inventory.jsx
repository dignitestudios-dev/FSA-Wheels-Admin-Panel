import React, { useState, useEffect } from "react";
import { FaUsers, FaTrash } from "react-icons/fa";
import axios from "../../axios"; // Import axios instance
import { ErrorToast, SuccessToast } from "../../components/global/Toaster"; // Import your toaster functions
import AddCarModal from "../../components/AddCarModal"; // Import the AddCarModal component
import CustomLoader from "../../components/global/CustomLoader"; // Import the CustomLoader component

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    make: "",
    model: "",
    type: "",
    passengers: "",
    images: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Fetching state for custom skeleton loader
  const [deleteCarId, setDeleteCarId] = useState(null); // Store car id for deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Show/hide delete confirmation modal

  const fetchCars = async () => {
    try {
      const response = await axios.get("/vehicles");
      if (response.data.success) {
        setCars(response.data.data);
      } else {
        ErrorToast("Failed to fetch vehicles.");
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      ErrorToast("An error occurred while fetching vehicles.");
    } finally {
      setIsFetching(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle input changes for Add Car Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // Handle file change for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Only take the first file (single image)
    if (file) {
      setNewCar((prevCar) => ({
        ...prevCar,
        images: [file], // Store the single image file in the array
      }));
    }
  };

  // Handle remove image (if applicable)
  const handleRemoveImage = (index) => {
    const updatedImages = newCar.images.filter((_, i) => i !== index);
    setNewCar((prevCar) => ({
      ...prevCar,
      images: updatedImages,
    }));
  };

  const handleAddCar = async () => {
    if (!newCar.name || !newCar.type || !newCar.passengers || !newCar.images[0]) {
      ErrorToast("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("vehicleName", newCar.name);
    formData.append("vehicleType", newCar.type);
formData.append("make", newCar.make);  // Use dynamic value
  formData.append("model", newCar.model); // Use dynamic value
    formData.append("seats", Number(newCar.passengers));
    formData.append("image", newCar.images[0]);

    try {
      const response = await axios.post("/vehicles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        SuccessToast("Vehicle added successfully!");
        setIsModalOpen(false);
        setNewCar({ name: "", make: "", model: "", type: "", passengers: "", images: [] });
        fetchCars();
      } else {
        // Handle validation errors or general errors
        if (response.data.errors) {
          // Example: Handle validation errors like "Seats must be at least 2"
          response.data.errors.forEach((error) => {
            ErrorToast(error.message);  // Show specific error message to the user
          });
        } else {
          ErrorToast("An unknown error occurred.");
        }
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      ErrorToast("An error occurred while adding the vehicle.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async () => {
    if (!deleteCarId) return;

    setLoading(true);

    try {
      const response = await axios.delete(`/vehicles/${deleteCarId}`);
      if (response.data.success) {
        SuccessToast("Vehicle deleted successfully!");
        setCars((prevCars) => prevCars.filter((car) => car._id !== deleteCarId));
      } else {
        ErrorToast("Failed to delete vehicle.");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      ErrorToast("An error occurred while deleting the vehicle.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false); // Close the delete modal
    }
  };

  return (
    <div>
      {/* Header with Button */}
      <div className="p-6 pt-0 col-span-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-blue-700"
        >
          Add Inventory
        </button>
      </div>

         {isFetching ? (
        // Display Custom Skeleton Loader while fetching data
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 pt-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <CustomLoader key={index} />
          ))}
        </div>
      ) : cars.length === 0 ? (
        // Show "No inventory available" if no cars are fetched
        <div className="p-6 text-center text-gray-500 ">
          No inventory available
        </div>
      ) : (
        <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {/* Car Cards */}
  {cars.map((car) => (
    <div
      key={car._id}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl relative flex flex-col"
    >
      {/* Delete Button */}
      <button
        onClick={() => {
          setDeleteCarId(car._id);
          setShowDeleteModal(true);
        }}
        className="absolute top-2 right-2 flex items-center gap-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-colors duration-300"
      >
      <span className="text-xs">Delete</span>  <FaTrash className="text-xs" />
      </button>

      {/* Car Image */}
      <img
        src={car.image}
        alt={car.vehicleName}
        className="w-full h-48 object-contain rounded-t-2xl"
      />

      {/* Car Details */}
      <div className="p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{car.vehicleName}</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-medium text-gray-500">Type: {car.vehicleType}</p>
          <p className="font-medium text-gray-500">Make: {car.make}</p>
          <p className="font-medium text-gray-500">Model: {car.model}</p>
          <div className="flex font-medium items-center gap-2 text-gray-500">
            Seats : <FaUsers className="text-blue-600 text-lg" />
            <span>{car.seats}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-xl font-semibold text-gray-800">Are you sure?</h3>
            <p className="text-sm text-gray-600 my-4">
              Do you really want to delete this vehicle? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCar}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal should be outside conditional rendering to prevent issues */}
      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newCar={newCar}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        handleAddCar={handleAddCar}
        loading={loading}
      />
    </div>
  );
};

export default Inventory;
