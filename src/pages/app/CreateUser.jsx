import React, { useState } from "react";
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
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
    drivingLicenseFrontImage: null,
    drivingLicenseBackImage: null,
    insuranceCertificateImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: files[0], // Store the first selected file
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
    drivingLicenseFrontImage,
    drivingLicenseBackImage,
    insuranceCertificateImage,
  } = newUser;

  // Trim spaces from input fields
  const trimmedFields = {
    name: name.trim(),
    email: email.trim(),
    supervisor: supervisor.trim(),
    workContactNumber: workContactNumber.trim(),
    personalContactNumber: personalContactNumber.trim(),
    address: address.trim(),
    membershipNumber: membershipNumber.trim(),
    drivingLicenseNumber: drivingLicenseNumber.trim(),
    insuranceCompany: insuranceCompany.trim(),
  };

  // Check if any required field is just spaces or empty
  if (
    !trimmedFields.name ||
    !trimmedFields.email ||
    !trimmedFields.supervisor ||
    !trimmedFields.workContactNumber ||
    !trimmedFields.personalContactNumber ||
    !trimmedFields.address ||
    !trimmedFields.membershipNumber ||
    !trimmedFields.drivingLicenseNumber ||
    !trimmedFields.insuranceCompany ||
    !drivingLicenseFrontImage ||
    !drivingLicenseBackImage ||
    !insuranceCertificateImage
  ) {
    ErrorToast("Please fill out all fields and upload necessary files.");
    setLoading(false); // ✅ STOP LOADING
    return;
  }

  // Length validations
  if (trimmedFields.name.length > 100 || trimmedFields.supervisor.length > 100) {
    ErrorToast("Name or supervisor name is too long.");
    return;
  }

  if (workContactNumber.length > 15 || personalContactNumber.length > 15) {
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

  // Prepare data for form submission
  const formData = new FormData();
  formData.append("name", trimmedFields.name);
  formData.append("email", trimmedFields.email);
  formData.append("supervisor", trimmedFields.supervisor);
  formData.append("workContactNumber", trimmedFields.workContactNumber);
  formData.append("personalContactNumber", trimmedFields.personalContactNumber);
  formData.append("address", trimmedFields.address);
  formData.append("membershipNumber", trimmedFields.membershipNumber);
  formData.append("drivingLicenseNumber", trimmedFields.drivingLicenseNumber);
  formData.append("insuranceCompany", trimmedFields.insuranceCompany);
  formData.append("drivingLicenseFrontImage", drivingLicenseFrontImage);
  formData.append("drivingLicenseBackImage", drivingLicenseBackImage);
  formData.append("insuranceCertificateImage", insuranceCertificateImage);
  formData.append("locationType", "Point");

  try {
    await axios.post("/user/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
      drivingLicenseFrontImage: null,
      drivingLicenseBackImage: null,
      insuranceCertificateImage: null,
    });

    // Delay before navigation to allow toast display
    setTimeout(() => {
      navigate("/app/users");
    }, 1000); // 1 second
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
              maxLength={12}
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

            {/* Driving License Front Image */}
            <FileInput
              label="Driving License Front Image"
              id="drivingLicenseFrontImage"
              onChange={handleFileChange}
              required
            />

            {/* Driving License Back Image */}
            <FileInput
              label="Driving License Back Image"
              id="drivingLicenseBackImage"
              onChange={handleFileChange}
              required
            />

            {/* Insurance Certificate Image */}
            <FileInput
              label="Insurance Certificate Image"
              id="insuranceCertificateImage"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
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

const FileInput = ({ label, id, onChange, required }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
    if (file && file.size > MAX_SIZE) {
      alert("File size should not exceed 10 MB.");
      e.target.value = ""; // Clear the file input
      return;
    }

    // Pass the valid file to the parent onChange function
    onChange(e);
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={id}
        onChange={handleFileChange}
        accept="image/*" // Only allow image files
        className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
};


export default CreateUser;
