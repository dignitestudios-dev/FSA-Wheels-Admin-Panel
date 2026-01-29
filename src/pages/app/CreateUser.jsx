import React, { useState } from "react";
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router";
import { FiLoader } from "react-icons/fi";

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
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const { name, email } = newUser;

    // ✅ REQUIRED VALIDATION (ONLY NAME & EMAIL)
    if (!name.trim() || !email.trim()) {
      ErrorToast("Name and email are required.");
      setLoading(false);
      return;
    }

    // OPTIONAL LENGTH VALIDATIONS
    if (name.length > 100) {
      ErrorToast("Name is too long.");
      setLoading(false);
      return;
    }

    if (newUser.supervisor && newUser.supervisor.length > 100) {
      ErrorToast("Supervisor name is too long.");
      setLoading(false);
      return;
    }

    if (
      newUser.workContactNumber &&
      newUser.workContactNumber.length > 15
    ) {
      ErrorToast("Work contact number is too long.");
      setLoading(false);
      return;
    }

    if (
      newUser.personalContactNumber &&
      newUser.personalContactNumber.length > 15
    ) {
      ErrorToast("Personal contact number is too long.");
      setLoading(false);
      return;
    }

    // FORM DATA
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("locationType", "Point");

    // OPTIONAL FIELDS (append only if present)
    Object.entries(newUser).forEach(([key, value]) => {
      if (
        value &&
        key !== "name" &&
        key !== "email" &&
        key !== "locationType"
      ) {
        formData.append(key, value);
      }
    });

    try {
      await axios.post("/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      SuccessToast("User Created Successfully!");

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

      setTimeout(() => navigate("/app/users"), 1000);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create user.";
      ErrorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-3 p-6 pt-0">
      <h2 className="text-3xl font-semibold mb-6">Create User</h2>

      <div className="bg-white p-6 border rounded-xl shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField label="Full Name" id="name" value={newUser.name} onChange={handleInputChange} required />
            <InputField label="Email Address" id="email" type="email" value={newUser.email} onChange={handleInputChange} required />

            <InputField label="Supervisor" id="supervisor" value={newUser.supervisor} onChange={handleInputChange} />
            <InputField label="Work Contact Number" id="workContactNumber" value={newUser.workContactNumber} onChange={handleInputChange} />
            <InputField label="Personal Contact Number" id="personalContactNumber" value={newUser.personalContactNumber} onChange={handleInputChange} />
            <InputField label="Address" id="address" value={newUser.address} onChange={handleInputChange} />
            <InputField label="Membership Number" id="membershipNumber" value={newUser.membershipNumber} onChange={handleInputChange} />
            <InputField label="Driving License Number" id="drivingLicenseNumber" value={newUser.drivingLicenseNumber} onChange={handleInputChange} />
            <InputField label="Insurance Company" id="insuranceCompany" value={newUser.insuranceCompany} onChange={handleInputChange} />

            <FileInput label="Driving License Front Image" id="drivingLicenseFrontImage" onChange={handleFileChange} />
            <FileInput label="Driving License Back Image" id="drivingLicenseBackImage" onChange={handleFileChange} />
            <FileInput label="Insurance Certificate Image" id="insuranceCertificateImage" onChange={handleFileChange} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl flex justify-center gap-2 ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                Creating <FiLoader className="animate-spin" />
              </>
            ) : (
              "Create User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type = "text", value, onChange, required }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-6 py-3 border rounded-xl"
    />
  </div>
);

const FileInput = ({ label, id, onChange }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      type="file"
      id={id}
      name={id}
      onChange={onChange}
      accept="image/*"
      className="w-full px-6 py-3 border rounded-xl"
    />
  </div>
);

export default CreateUser;
