import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "../../axios";
import { SuccessToast } from "../../components/global/Toaster";

const UserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  

  const [user, setUser] = useState(state?.user || null);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // MODALS
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // EDIT FORM
  const [editForm, setEditForm] = useState({
    name: "",
    workContactNumber: "",
    personalContactNumber: "",
    address: "",
    membershipNumber: "",
    drivingLicenseNumber: "",
    insuranceCompany: "",
  });

  useEffect(() => {
    if (!user) return;

    setEditForm({
      name: user.name || "",
      workContactNumber: user.workContactNumber || "",
      personalContactNumber: user.personalContactNumber || "",
      address: user.address || "",
      membershipNumber: user.membershipNumber || "",
      drivingLicenseNumber: user.drivingLicenseNumber || "",
      insuranceCompany: user.insuranceCompany || "",
    });
  }, [user]);

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          No user data found.{" "}
          <button className="text-blue-600 underline" onClick={() => navigate(-1)}>
            Go back
          </button>
        </p>
      </div>
    );
  }

  // TOGGLE STATUS API CALL
  const toggleStatus = async () => {
    setLoadingStatus(true);

    try {
      const response = await axios.patch(`/user/${user._id}/status`);
      setUser(response.data.data);
      SuccessToast("Status updated successfully");
        // Redirect after update
      navigate("/app/users");
      setShowDeactivateModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatus(false);
    }
  };

  // SAVE EDIT API CALL
  const saveEdit = async () => {
    setLoadingSave(true);

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("workContactNumber", editForm.workContactNumber);
      formData.append("personalContactNumber", editForm.personalContactNumber);
      formData.append("address", editForm.address);
      formData.append("membershipNumber", editForm.membershipNumber);
      formData.append("drivingLicenseNumber", editForm.drivingLicenseNumber);
      formData.append("insuranceCompany", editForm.insuranceCompany);

      const response = await axios.put(`/user/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update state with returned data
      setUser(response.data.data);

      SuccessToast("User updated successfully!");
            navigate("/app/users");

      setShowEditModal(false);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-0 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">User Profile</h2>

        <div className="flex gap-3">
          {/* EDIT BUTTON */}
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Edit User
          </button>

          {/* STATUS BUTTON */}
          <button
            onClick={() => setShowDeactivateModal(true)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              user.isDeactivatedByAdmin
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            {user.isDeactivatedByAdmin ? "Activate" : "Deactivate"}
          </button>
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed -inset-8 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="mb-6">
              Are you sure you want to{" "}
              {user.isDeactivatedByAdmin ? "activate" : "deactivate"} this user?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={toggleStatus}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  user.isDeactivatedByAdmin
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {loadingStatus ? "Updating..." : user.isDeactivatedByAdmin ? "Activate User" : "Deactivate User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed -inset-8 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>

            <div className="space-y-3">
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Name"
              />

              <input
                value={editForm.workContactNumber}
                onChange={(e) =>
                  setEditForm({ ...editForm, workContactNumber: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Work Contact Number"
              />

              <input
                value={editForm.personalContactNumber}
                onChange={(e) =>
                  setEditForm({ ...editForm, personalContactNumber: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Personal Contact Number"
              />

              <input
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Address"
              />

              <input
                value={editForm.membershipNumber}
                onChange={(e) =>
                  setEditForm({ ...editForm, membershipNumber: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Membership Number"
              />

              <input
                value={editForm.drivingLicenseNumber}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    drivingLicenseNumber: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Driving License Number"
              />

              <input
                value={editForm.insuranceCompany}
                onChange={(e) =>
                  setEditForm({ ...editForm, insuranceCompany: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Insurance Company"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              >
                {loadingSave ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b pb-6 mb-6 bg-gray-50 rounded-xl p-4 text-start border border-gray-200">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-36 h-36 rounded-full object-cover"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-blue-500 flex items-center justify-center text-white text-6xl">
              {user.name
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          )}

          <div className="space-y-2 ">
            <h3 className="text-3xl font-semibold text-gray-900 mt-6">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>

            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              <span className="bg-blue-100 border text-blue-700 px-3 py-1 rounded-full">
                Supervisor: {user.supervisor || "N/A"}
              </span>
              <span className="bg-green-100 border text-green-700 px-3 py-1 rounded-full">
                Membership: {user.membershipNumber || "N/A"}
              </span>

              <span
                className={`px-3 py-1 rounded-full border text-sm font-semibold ${
                  user.isDeactivatedByAdmin ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {user.isDeactivatedByAdmin ? "Inactive" : "Active"}
              </span>

              <span className="bg-gray-100 border text-gray-800 px-3 py-1 rounded-full">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-4 text-start border border-gray-200">
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              Contact Information
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Work Contact:</strong> {user.workContactNumber || "N/A"}
              </li>
              <li>
                <strong>Personal Contact:</strong> {user.personalContactNumber || "N/A"}
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-start border border-gray-200">
            <h4 className="text-xl font-semibold mb-3 text-gray-800">Location</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {user.location?.coordinates?.length === 2 ? (
                <div>
                  <li>
                    <button
                      onClick={() => {
                        const lat = user.location.coordinates[1];
                        const lng = user.location.coordinates[0];
                        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                        window.open(googleMapsUrl, "_blank");
                      }}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Location on Google Maps
                    </button>
                  </li>
                  <div className="flex gap-1 mt-2">
                    <li className="font-bold">Address: </li>
                    <span>{user?.address || "N/A"}</span>
                  </div>
                </div>
              ) : (
                <li>Location: N/A</li>
              )}
            </ul>
          </div>
        </div>

        <hr className="my-6" />

        {/* DOCUMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-4 text-start border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800">Driving License</h4>
            <p className="text-sm text-gray-700 mb-2">
              License #: {user.drivingLicenseNumber || "N/A"}
            </p>
            <div className="flex gap-4">
              {user.drivingLicenseFrontImage ? (
                <img
                  src={user.drivingLicenseFrontImage}
                  alt="Front"
                  className="w-36 h-24 object-cover border rounded-lg"
                />
              ) : (
                <div className="text-sm text-gray-500">No front image</div>
              )}
              {user.drivingLicenseBackImage ? (
                <img
                  src={user.drivingLicenseBackImage}
                  alt="Back"
                  className="w-36 h-24 object-cover border rounded-lg"
                />
              ) : (
                <div className="text-sm text-gray-500">No back image</div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-start border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800">Insurance</h4>
            <p className="text-sm text-gray-700 mb-2">
              Company: {user.insuranceCompany || "N/A"}
            </p>
            {user.insuranceCertificateImage ? (
              <img
                src={user.insuranceCertificateImage}
                alt="Insurance"
                className="w-40 h-28 object-cover border rounded-lg"
              />
            ) : (
              <div className="text-sm text-gray-500">No certificate image</div>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* STATS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <h5 className="text-sm text-gray-500 font-medium">Total Rides</h5>
            <p className="text-3xl font-bold text-gray-500">{user.totalRides}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <h5 className="text-sm text-gray-500 font-medium">
              Current Reservations
            </h5>
            <p className="text-3xl font-bold text-gray-500">
              {user.totalCurrentReservations}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <h5 className="text-sm text-gray-500 font-medium">
              Ride Cancellations
            </h5>
            <p className="text-3xl font-bold text-gray-500">
              {user.totalRideCancellations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
