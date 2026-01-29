import React, { useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const AddCarModal = ({
  isOpen,
  onClose,
  newCar = {
    name: "",
    make: "",
    model: "",
    type: "",
    passengers: "",
    images: [],
  },
  handleInputChange,
  handleFileChange,
  handleAddCar,
  loading,
  isEditMode,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [passengerError, setPassengerError] = useState("");

  /* ---------------- SAFE IMAGE STATE ---------------- */
  useEffect(() => {
    if (isOpen) {
      setImageUploaded(!!newCar?.images?.length);
    } else {
      setImageUploaded(false);
    }
  }, [isOpen, newCar?.images?.length]);

  if (!isOpen) return null;

  const handleImageChange = (event) => {
    handleFileChange?.(event);
    setImageUploaded(event.target.files.length > 0);
  };

  const handlePassengersChange = (e) => {
    const value = Number(e.target.value);

    if (value < 2) {
      setPassengerError("Seats must be at least 2");
    } else if (value > 7) {
      setPassengerError("Seats cannot exceed 7");
    } else {
      setPassengerError("");
    }

    handleInputChange?.(e);
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {isEditMode ? "Edit Car" : "Add New Car"}
        </h2>

        <form className="space-y-4">
          {/* Car Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Car Name</label>
            <input
              name="name"
              value={newCar.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter car name"
            />
          </div>

          {/* Make & Model */}
          <div className="flex gap gap-2">
            <input
              name="make"
              value={newCar.make}
              onChange={handleInputChange}
              className="w-1/2 p-3 border rounded-lg"
              placeholder="Make"
            />
            <input
              name="model"
              value={newCar.model}
              onChange={handleInputChange}
              className="w-1/2 p-3 border rounded-lg"
              placeholder="Model"
            />
          </div>

          {/* Type */}
          <select
            name="type"
            value={newCar.type}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select car type</option>
            <option value="Coupe">Coupe</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="MPV">MPV</option>
            <option value="Minivan">Minivan</option>
          </select>

          {/* Passengers */}
          <input
            type="number"
            name="passengers"
            value={newCar.passengers}
            onChange={handlePassengersChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Number of passengers"
          />
          {passengerError && (
            <p className="text-sm text-red-500">{passengerError}</p>
          )}

          {/* Image Upload */}
          <label
            htmlFor="image-upload"
            className={`cursor-pointer w-full py-3 border rounded-lg flex items-center justify-center gap-2
              ${imageUploaded ? "bg-blue-600 text-white" : "border-blue-500 text-blue-500"}`}
          >
            <IoMdCloudUpload className="text-3xl" />
            {imageUploaded ? "Image Uploaded" : "Click to upload image"}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={handleAddCar}
              disabled={!!passengerError}
              className="w-1/2 bg-blue-600 text-white py-3 rounded-lg"
            >
              {loading ? "Saving..." : isEditMode ? "Update" : "Add"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-400 text-white py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
