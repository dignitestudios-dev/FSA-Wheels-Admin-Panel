import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { audi, hyundai, van } from "../../assets/export";
import { IoMdCloudUpload } from "react-icons/io";

const Inventory = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Audi E-tron GT",
      type: "Sedan",
      passengers: 4,
      image: audi,
    },
    {
      id: 2,
      name: "Hyundai",
      type: "SUV",
      passengers: 6,
      image: hyundai,
    },
    {
      id: 3,
      name: "Ford Van",
      type: "Sedan",
      passengers: 10,
      image: van,
    },
  ]);

  const [newCar, setNewCar] = useState({
    name: "",
    type: "",
    passengers: "",
    images: [], // Changed from 'image' to 'images' (array)
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));

    setNewCar((prevCar) => ({
      ...prevCar,
      images: [...prevCar.images, ...imageURLs], // Add new images to the array
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newCar.images.filter((_, i) => i !== index);
    setNewCar((prevCar) => ({
      ...prevCar,
      images: updatedImages,
    }));
  };

  const handleAddCar = () => {
    setCars((prevCars) => [
      ...prevCars,
      { id: cars.length + 1, ...newCar },
    ]);
    setNewCar({ name: "", type: "", passengers: "", images: [] }); // Reset images array
    setIsModalOpen(false); // Close modal after adding the car
  };

  return (
    <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="col-span-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
        {/* Add Inventory Button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open modal
          className="bg-blue-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-blue-700"
        >
          Add Inventory
        </button>
      </div>

      {/* Inventory Items */}
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white border border-gray-300 rounded-xl shadow p-4 flex flex-col"
        >
          {/* Car Image */}
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-32 object-contain"
          />
          {/* Car Details */}
          <div className="mt-3 border-t pt-3">
            <h2 className="text-base font-semibold text-gray-800">{car.name}</h2>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-500 text-sm">{car.type}</p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <FaUsers className="text-lg" /> {car.passengers}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal to Add New Car */}
     {isModalOpen && (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Car</h2>
      <form className="space-y-5">
        {/* Car Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
            Car Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCar.name}
            onChange={handleInputChange}
            placeholder="Enter car name"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
          />
        </div>
        
        {/* Car Type */}
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2">
            Car Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={newCar.type}
            onChange={handleInputChange}
            placeholder="Enter car type"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
          />
        </div>
        
        {/* Number of Passengers */}
        <div className="flex flex-col">
          <label htmlFor="passengers" className="text-sm font-medium text-gray-700 mb-2">
            Number of Passengers
          </label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            value={newCar.passengers}
            onChange={handleInputChange}
            placeholder="Enter number of passengers"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
          />
        </div>

        {/* Car Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image-upload" className="text-sm font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <div className="mt-4">
      <label
        htmlFor="image-upload"
        className="cursor-pointer w-full py-6 bg-white text-blue-500 border border-blue-500 rounded-lg transition duration-200 ease-in-out flex flex-col items-center justify-center gap-2"
      >
        {/* Upload Icon above the text */}
        <IoMdCloudUpload className="text-blue-500 text-4xl" />
        <span className="text-sm">Upload Images</span>
      </label>
      
      {/* Hidden Input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </div>

          {/* Show image previews */}
          {newCar.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {newCar.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md border-2 border-gray-300 shadow-sm"
                  />
                  {/* Remove Image Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full p-2 hover:bg-red-700 focus:outline-none"
                  >
x                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex gap-5">
          <button
            type="button"
            onClick={handleAddCar}
            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          >
            Add Car
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)} // Close modal
            className="w-1/2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Inventory;
