import React, { useState } from "react";
import { SuccessToast, ErrorToast } from "../components/global/Toaster"; // Import toast functions
import { FiLoader } from "react-icons/fi"; // Import loading 
import axios from "../axios"

const CreateNotifications = ({ closeModal }) => {
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "Info", // Default type
    date: new Date().toISOString().slice(0, 19), // Default to current date
  });

  const [loading, setLoading] = useState(false); // Loading state for form submission

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, message, type } = newNotification;

    // Validation: Ensure both title and message are provided
    if (!title || !message) {
      ErrorToast("Please provide both title and message for the notification.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // API call to create a new notification
      const response = await axios.post("/notifications/push-notification", {
        title,
        body: message,
      });

      // Handle the response
      if (response.status === 200) {
        SuccessToast("Notification created successfully!");
        setNewNotification({
          title: "",
          message: "",
          type: "Info",
          date: new Date().toISOString().slice(0, 19),
        });
        closeModal(); // Close modal after successful submission
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      ErrorToast("Failed to create notification. Please try again.");
    } finally {
      setLoading(false); // Stop loading after request is finished
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-700">
            Notification Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newNotification.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mt-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={newNotification.message}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Notification Type
          </label>
          <select
            id="type"
            name="type"
            value={newNotification.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Info">Info</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
          </select>
        </div> */}

        <div>
          <button
            type="submit"
            className="w-full flex-col py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <>
                <span>Creating...</span>
                <FiLoader className="animate-spin text-white" />
              </>
            ) : (
              <span>Create Notification</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotifications;
