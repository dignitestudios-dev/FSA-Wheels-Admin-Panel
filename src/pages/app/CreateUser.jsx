import React, { useState } from "react";
import instance from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { useNavigate } from "react-router";
import { FiLoader } from "react-icons/fi"; // Spinner






const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    supervisor: "",
    workContactNumber: "",
    personalContactNumber: "",
    address: "",
    membershipNumber: "",
    drivingLicenseNumber: "",
    insuranceCompany: "",
    locationType: "Point",
    // latitude: "",
    // longitude: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Fields that should only accept numbers or valid numeric characters
    const numberFields = [
      "workContactNumber",
      "personalContactNumber",
      // "latitude",
      // "longitude",
    ];

    if (numberFields.includes(name)) {
      if (!/^[0-9+.\-]*$/.test(value)) return;
    }

    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (loading) return; // prevent double submits
  setLoading(true); // ✅ START LOADING

    
    const {
      name,
      email,
      supervisor,
      workContactNumber,
      personalContactNumber,
      address,
      membershipNumber,
      drivingLicenseNumber,
      insuranceCompany,
      locationType,
      // latitude,
      // longitude,
    } = newUser;

    // Basic empty field check
    if (
      !name ||
      !email ||
      !supervisor ||
      !workContactNumber ||
      !personalContactNumber ||
      !address ||
      !membershipNumber ||
      !drivingLicenseNumber ||
      !insuranceCompany
      // !latitude ||
      // !longitude
    ) {
      ErrorToast("Please fill out all fields.");
          setLoading(false); // ✅ STOP LOADING

      return;
    }

    // Length validations
    if (name.length > 100 || supervisor.length > 100) {
      ErrorToast("Name or supervisor name is too long.");
      return;
    }

    if (
      workContactNumber.length > 15 ||
      personalContactNumber.length > 15
    ) {
      ErrorToast("Contact numbers must be 15 characters or fewer.");
      return;
    }

    if (
      membershipNumber.length > 25 ||
      drivingLicenseNumber.length > 25 ||
      insuranceCompany.length > 100
    ) {
      ErrorToast("Membership, license, or insurance input is too long.");
      return;
    }

    // Latitude and longitude validation
//     const lat = parseFloat(latitude);
//     const lng = parseFloat(longitude);
//     if (isNaN(lat) || isNaN(lng)) {
//   ErrorToast("Latitude and Longitude must be numbers.");
//   return;
// }

    const payload = {
      name,
      email,
      supervisor,
      workContactNumber,
      personalContactNumber,
      address,
      membershipNumber,
      drivingLicenseNumber,
      insuranceCompany,
      // location: {
      //   type: locationType,
      //   coordinates: [lng, lat],
      // },
      location,
    };

   try {
  await axios.post("/user/register", payload);
  SuccessToast("User Created Successfully!");

  // Reset form
  setNewUser({
    name: "",
    email: "",
    supervisor: "",
    workContactNumber: "",
    personalContactNumber: "",
    address: "",
    membershipNumber: "",
    drivingLicenseNumber: "",
    insuranceCompany: "",
    locationType: "Point",
    // latitude: "",
    // longitude: "",
  });

  // Delay before navigation to allow toast display
  setTimeout(() => {
    navigate("/app/users");
  }, 1000); // 1.2 seconds
} catch (error) {
  console.error("Create user error:", error);
  const msg = error.response?.data?.message || "Failed to create user.";
  ErrorToast(msg);
} finally {
    setLoading(false); // Reset loading whether success or error
  }
  };

  return (
    <div className="col-span-3 p-6 pt-0">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create User</h2>
      <div className="bg-white p-6 mb-6 border border-gray-300 rounded-xl shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <InputField
              label="Full Name"
              id="name"
              value={newUser.name}
              onChange={handleInputChange}
              maxLength={100}
              required
            />

            {/* Email */}
            <InputField
              label="Email Address"
              id="email"
              type="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />

            {/* Supervisor */}
            <InputField
              label="Supervisor"
              id="supervisor"
              value={newUser.supervisor}
              onChange={handleInputChange}
              maxLength={100}
              required
            />

            {/* Work Contact Number */}
            <InputField
              label="Work Contact Number"
              id="workContactNumber"
              value={newUser.workContactNumber}
              onChange={handleInputChange}
              maxLength={15}
              inputMode="numeric"
              required
            />

            {/* Personal Contact Number */}
            <InputField
              label="Personal Contact Number"
              id="personalContactNumber"
              value={newUser.personalContactNumber}
              onChange={handleInputChange}
              maxLength={15}
              inputMode="numeric"
              required
            />

            {/* Address */}
            <InputField
              label="Address"
              id="address"
              value={newUser.address}
              onChange={handleInputChange}
              maxLength={200}
              required
            />

            {/* Membership Number */}
            <InputField
              label="Membership Number"
              id="membershipNumber"
              value={newUser.membershipNumber}
              onChange={handleInputChange}
              maxLength={25}
              required
            />

            {/* Driving License Number */}
            <InputField
              label="Driving License Number"
              id="drivingLicenseNumber"
              value={newUser.drivingLicenseNumber}
              onChange={handleInputChange}
              maxLength={25}
              required
            />

            {/* Insurance Company */}
            <InputField
              label="Insurance Company"
              id="insuranceCompany"
              value={newUser.insuranceCompany}
              onChange={handleInputChange}
              maxLength={100}
              required
            />

            {/* Latitude */}
            {/* <InputField
              label="Latitude"
              id="latitude"
              value={newUser.latitude}
              onChange={handleInputChange}
              type="number"
              step="any"
              required
            /> */}

            {/* Longitude */}
            {/* <InputField
              label="Longitude"
              id="longitude"
              value={newUser.longitude}
              onChange={handleInputChange}
              type="number"
              step="any"
              required
            /> */}
          </div>

          {/* Submit Button */}
          <div>
  <button
    type="submit"
    disabled={loading}
    className={`w-full py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
      loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
  >
    {loading ? (
      <>
        <span className="text-white">Creating...</span>
        <FiLoader className="animate-spin text-white text-xl" />
      </>
    ) : (
      <span>Create User</span>
    )}
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

// ✅ Reusable Input Component
const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  maxLength,
  inputMode,
  step,
  required,
}) => (
  <div>
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      maxLength={maxLength}
      inputMode={inputMode}
      step={step}
      required={required}
    />
  </div>
);

export default CreateUser;
