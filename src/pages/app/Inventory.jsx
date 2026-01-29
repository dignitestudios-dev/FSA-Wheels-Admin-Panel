import React, { useState, useEffect } from "react";
import { FaUsers, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import AddCarModal from "../../components/AddCarModal";
import CustomLoader from "../../components/global/CustomLoader";

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
  const [isFetching, setIsFetching] = useState(true);

  // Selected car view modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);

  const [deleteCarId, setDeleteCarId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchCars = async () => {
    try {
      const response = await axios.get("/vehicles");
      if (response.data.success) {
        setCars(response.data.data);
      } else {
        ErrorToast("Failed to fetch vehicles.");
      }
    } catch (error) {
      ErrorToast("An error occurred while fetching vehicles.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCar((prevCar) => ({
        ...prevCar,
        images: [file],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newCar.images.filter((_, i) => i !== index);
    setNewCar((prevCar) => ({
      ...prevCar,
      images: updatedImages,
    }));
  };

  // ADD CAR
  const handleAddCar = async () => {
    if (!newCar.name || !newCar.type || !newCar.passengers || !newCar.images[0]) {
      ErrorToast("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("vehicleName", newCar.name);
    formData.append("vehicleType", newCar.type);
    formData.append("make", newCar.make);
    formData.append("model", newCar.model);
    formData.append("seats", Number(newCar.passengers));
    formData.append("image", newCar.images[0]);

    try {
      const response = await axios.post("/vehicles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        SuccessToast("Vehicle added successfully!");
        setIsModalOpen(false);
        setNewCar({ name: "", make: "", model: "", type: "", passengers: "", images: [] });
        fetchCars();
      } else {
        ErrorToast("An unknown error occurred.");
      }
    } catch (error) {
      ErrorToast("An error occurred while adding the vehicle.");
    } finally {
      setLoading(false);
    }
  };

  // EDIT CAR
  const handleEditCar = async () => {
    if (!selectedCar || !selectedCar._id) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("vehicleName", newCar.name);
    formData.append("vehicleType", newCar.type);
    formData.append("make", newCar.make);
    formData.append("model", newCar.model);
    formData.append("seats", Number(newCar.passengers));

    // Only update image if user uploads new one
    if (newCar.images[0]) {
      formData.append("image", newCar.images[0]);
    }

    try {
      const response = await axios.put(`/vehicles/${selectedCar._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        SuccessToast("Vehicle updated successfully!");
        setIsModalOpen(false);
        setIsEditMode(false);
        setSelectedCar(null);
        fetchCars();
      } else {
        ErrorToast("Failed to update vehicle.");
      }
    } catch (error) {
      ErrorToast("An error occurred while updating the vehicle.");
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
        showDeleteModal(false);
        setCars((prevCars) => prevCars.filter((car) => car._id !== deleteCarId));
      } else {
        ErrorToast("Failed to delete vehicle.");
      }
    } catch (error) {
      ErrorToast("An error occurred while deleting the vehicle.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const openEditModal = (car) => {
    setSelectedCar(car);
    setIsEditMode(true);

    // Prefill data
    setNewCar({
      name: car.vehicleName,
      make: car.make,
      model: car.model,
      type: car.vehicleType,
      passengers: car.seats,
      images: [],
    });

    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="p-6 pt-0 col-span-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setNewCar({ name: "", make: "", model: "", type: "", passengers: "", images: [] });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-blue-700"
        >
          Add Inventory
        </button>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 pt-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <CustomLoader key={index} />
          ))}
        </div>
      ) : cars.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No inventory available</div>
      ) : (
        <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              onClick={() => setSelectedCar(car)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer relative flex flex-col"
            >
              <img
                src={car.image}
                alt={car.vehicleName}
                className="w-full h-48 object-contain rounded-t-2xl"
              />
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

      {/* VIEW MODAL */}
      {selectedCar && !isEditMode && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <img
              src={selectedCar.image}
              alt={selectedCar.vehicleName}
              className="w-full h-52 object-contain rounded-xl mb-4"
            />

            <h3 className="text-xl font-bold text-gray-800">{selectedCar.vehicleName}</h3>
            <p className="text-gray-600 mt-2">Type: {selectedCar.vehicleType}</p>
            <p className="text-gray-600">Make: {selectedCar.make}</p>
            <p className="text-gray-600">Model: {selectedCar.model}</p>
            <p className="text-gray-600 flex items-center gap-2">
              Seats: <FaUsers className="text-blue-600" /> {selectedCar.seats}
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => openEditModal(selectedCar)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => {
                  setDeleteCarId(selectedCar._id);
                  setShowDeleteModal(true);
                }}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
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

      {/* ADD / EDIT MODAL */}
      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedCar(null);
        }}
        newCar={newCar}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        handleAddCar={isEditMode ? handleEditCar : handleAddCar}
        loading={loading}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Inventory;
