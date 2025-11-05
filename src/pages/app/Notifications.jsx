import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CreateNotifications from '../../components/CreateNotifications';
import axios from '../../axios';
import moment from 'moment';

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ---------- 📩 FETCH ADMIN NOTIFICATIONS ----------
  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/notifications/admin-notifications?page=${page}`);
      if (response.data.success) {
        setNotifications(response.data.data);
        setTotalPages(response.data.pagination.pages);
      } else {
        setError('Failed to fetch notifications.');
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Something went wrong while fetching notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  // ---------- PAGINATION ----------
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

      {/* Notifications List */}
      <div className="space-y-3">
        {loading ? (
          Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-4 animate-pulse border-l-4 border-blue-500"
              >
                <div className="h-4 bg-gray-200 w-1/3 mb-3 rounded"></div>
                <div className="h-3 bg-gray-200 w-2/3 mb-2 rounded"></div>
                <div className="h-3 bg-gray-200 w-1/4 rounded"></div>
              </div>
            ))
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No notifications found.</p>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{notification.body}</p>
              <p className="text-xs text-gray-500">
                {moment(notification.createdAt).format('DD MMM YYYY, hh:mm A')}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-600 px-4 py-2 mx-2 rounded-md"
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 px-4 py-2 mx-2 rounded-md"
          >
            Next
          </button>
        </div>
      )}

      {/* Create Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Create Notification
            </h2>

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
