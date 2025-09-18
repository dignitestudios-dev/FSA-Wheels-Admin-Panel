import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateNotifications from '../../components/CreateNotifications';

// Sample Notifications Data
const notifications = [
  {
    id: 1,
    title: "System Update",
    message: "The system will be down for maintenance at 3 AM.",
    type: "Info",
    date: "2023-09-18 14:30",
  },
  {
    id: 2,
    title: "New User Registration",
    message: "A new user has successfully registered.",
    type: "Success",
    date: "2023-09-17 09:45",
  },
  {
    id: 3,
    title: "Password Expiry",
    message: "Your password will expire in 5 days.",
    type: "Warning",
    date: "2023-09-15 18:00",
  },
];

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="col-span-3 p-6 pt-0">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Push Notifications</h2>
        
        {/* Add Notification Button */}
        <button
          onClick={openModal}
          className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center gap-2"
        >
          <Plus className="text-xs" /> Create Notification
        </button>
      </div>

      {/* Notifications List (Vertical Layout) */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200 
                        ${notification.type === 'Success' ? 'border-l-4 border-green-500' : 
                          notification.type === 'Warning' ? 'border-l-4 border-yellow-500' : 
                          'border-l-4 border-blue-500'}`}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-3">{notification.date}</p>
          </div>
        ))}
      </div>

      {/* Create Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Notification</h2>

            {/* Notification Creation Form */}
            <CreateNotifications closeModal={closeModal} />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800"
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
