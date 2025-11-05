import React, { useState } from "react";
import { SuccessToast, ErrorToast } from "../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../axios";

const CreateNotifications = ({ closeModal }) => {
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "Info",
    date: new Date().toISOString().slice(0, 19),
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, message } = newNotification;

    if (!title || !message) {
      ErrorToast("Please provide both title and message for the notification.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/notifications/push-notification", {
        title,
        body: message,
      });

      if (response.status === 200) {
        SuccessToast("Notification created successfully!");
        setNewNotification({
          title: "",
          message: "",
          type: "Info",
          date: new Date().toISOString().slice(0, 19),
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      ErrorToast("Failed to create notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold mb-2 text-gray-700"
          >
            Notification Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newNotification.title}
            onChange={handleInputChange}
            placeholder="Enter notification title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={newNotification.message}
            onChange={handleInputChange}
            placeholder="Write your notification message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       min-h-[100px] resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 mt-4 rounded-lg text-white font-medium 
                     flex items-center justify-center gap-2 transition duration-300 
                     ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-white text-lg" />
              <span>Creating...</span>
            </>
          ) : (
            <span>Create Notification</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateNotifications;
