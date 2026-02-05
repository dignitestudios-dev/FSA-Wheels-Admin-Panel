import React, { useState, useEffect, useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { ChevronDown, Users } from "lucide-react";
import axios from "../axios";
import { SuccessToast, ErrorToast } from "../components/global/Toaster";

const CreateNotifications = ({ closeModal }) => {
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Users
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Dropdown
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get("/user", {
          params: {
            page: 1,
            limit: 50,
            active: true,
          },
        });

        setUsers(response.data.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ----------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUsersDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------- INPUT HANDLING ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- TOGGLE USER ----------------
  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newNotification.title || !newNotification.message) {
      ErrorToast("Please provide both title and message.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: newNotification.title,
        body: newNotification.message,
      };

      if (selectedUserIds.length > 0) {
        payload.userids = selectedUserIds;
      }

      const response = await axios.post(
        "/notifications/push-notification",
        payload
      );

      if (response.status === 200) {
        SuccessToast("Notification sent successfully!");
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      ErrorToast("Failed to create notification.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          Notification Title
        </label>
        <input
          type="text"
          name="title"
          value={newNotification.title}
          onChange={handleInputChange}
          maxLength={100}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          value={newNotification.message}
          onChange={handleInputChange}
          maxLength={250}
          required
          className="w-full px-4 py-2 border rounded-lg min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* USERS DROPDOWN */}
      <div ref={dropdownRef} className="relative">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Send To Users (Optional)
        </label>

        {/* Select Button */}
        <button
          type="button"
          onClick={() => setShowUsersDropdown((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-2.5 border rounded-lg bg-white hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={16} />
            {selectedUserIds.length > 0
              ? `${selectedUserIds.length} user(s) selected`
              : "Select users"}
          </div>
          <ChevronDown
            size={16}
            className={`transition ${
              showUsersDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {showUsersDropdown && (
          <div className="absolute z-50 mb-4 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {loadingUsers ? (
              <p className="text-sm text-gray-500 p-3">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-sm text-gray-500 p-3">No users found</p>
            ) : (
              users.map((user) => (
                <label
                  key={user._id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                    className="accent-blue-600"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </label>
              ))
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-1">
          If no users are selected, notification will be sent to all users.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold flex justify-center items-center gap-2 transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            Sending...
          </>
        ) : (
          "Create Notification"
        )}
      </button>
    </form>
  );
};

export default CreateNotifications;
