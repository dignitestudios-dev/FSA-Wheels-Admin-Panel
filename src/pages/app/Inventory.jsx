import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "../../axios"; // Import axios instance
import { ErrorToast, SuccessToast } from "../../components/global/Toaster"; // Import your toaster functions
import AddCarModal from "../../components/AddCarModal"; // Import the AddCarModal component
import CustomLoader from "../../components/global/CustomLoader"; // Import the CustomLoader component

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    make: '',       // ✅ New
    model: '',
    type: "",
    passengers: "",
    images: [],
  });





  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Fetching state for custom skeleton loader

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Only take the first file (single image)
    if (file) {
      setNewCar((prevCar) => ({
        ...prevCar,
        images: [file], // Store the single image file in the array
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

  const handleAddCar = async () => {
    if (!newCar.name || !newCar.type || !newCar.passengers || !newCar.images[0]) {
      ErrorToast("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("vehicleName", newCar.name);
    formData.append("vehicleType", newCar.type);
    formData.append("make", "Toyota");
    formData.append("model", "2023");
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
        setNewCar({ name: "", make: '', model: '', type: "", passengers: "", images: [] });
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


  return (
    <div>
       {/* Header with Button */}
      <div className="p-6 pt-0 col-span-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Inventory Management
        </h1>
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
  ) : (
    <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
     

      {/* Car Cards */}
      {cars.map((car) => (
        <div
          key={car._id}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-lg"
        >
          {/* Car Image */}
          <img
            src={car.image}
            alt={car.vehicleName}
            className="w-full h-48 object-cover rounded-t-xl"
          />

          {/* Car Details */}
          <div className="p-4 flex flex-col space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">
              {car.vehicleName}
            </h2>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p className="font-medium text-gray-500">{car.vehicleType}</p>
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-600 text-lg" />
                <span>{car.seats}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
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
