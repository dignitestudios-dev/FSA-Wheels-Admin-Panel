import React, { useState, useEffect } from 'react';
import { FaUsers, FaDollarSign, FaCalendarCheck, FaEdit, FaTrash, FaRegEye } from "react-icons/fa";
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router';
import Users from './Users'; // Import the Users component
import DashboardUsers from '../../components/DashboardUsers';
import axios from "../../axios"


const DummyHome = () => {
  // Example data for the dashboard
   const [stats, setStats] = useState({
    users: 0,
    reservations: 0,
    totalRevenue: 0, // optional if you later add revenue API
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Example user data (with images)
  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "johndoe@example.com", 
      role: "Admin", 
      dateJoined: "2021-05-10", 
      lastLogin: "2022-07-14", 
      image: "https://randomuser.me/api/portraits/men/10.jpg" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "janesmith@example.com", 
      role: "User", 
      dateJoined: "2021-08-22", 
      lastLogin: "2023-01-05", 
      image: "https://randomuser.me/api/portraits/men/10.jpg" 
    },
    { 
      id: 3, 
      name: "Chris Johnson", 
      email: "chrisjohnson@example.com", 
      role: "User", 
      dateJoined: "2022-02-10", 
      lastLogin: "2023-09-01", 
      image: "https://randomuser.me/api/portraits/men/10.jpg" 
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      email: "emilydavis@example.com", 
      role: "Admin", 
      dateJoined: "2021-11-18", 
      lastLogin: "2023-09-10", 
      image: "https://randomuser.me/api/portraits/men/10.jpg" 
    },
  ];

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();  // Initialize the navigation hook
  

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = () => {
    // Logic for deleting user
    alert(`User ${currentUser.name} deleted.`);
    setIsDeleteModalOpen(false);
  };

  const handleViewUser = (userId) => {
    // Navigate to the user details page
    navigate(`/app/user-details`);
  };


    const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/admin/dashboard/stats');
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        setError('Failed to fetch dashboard stats.');
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Something went wrong while fetching dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6 pt-0 grid grid-cols-2  gap-6">
      <h1 className="col-span-3 text-3xl font-semibold text-gray-800 ">Dashboard</h1>

      {/* Stat Cards */}
      {loading ? (
        <>
          {/* Skeleton loaders */}
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md animate-pulse"
              >
                <div className="h-4 bg-gray-300 w-1/3 mb-3 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ))}
        </>
      ) : error ? (
        <p className="text-red-500 col-span-3">{error}</p>
      ) : (
        <>
          {/* Total Users */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
            </div>
            <FaUsers className="text-4xl text-blue-600" />
          </div>

          {/* Total Reservations */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Reservations</h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats.reservations}
              </p>
            </div>
            <FaCalendarCheck className="text-4xl text-yellow-500" />
          </div>

          {/* Optional: Placeholder for future revenue */}
          {/* <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">$0</p>
            </div>
            <FaDollarSign className="text-4xl text-green-500" />
          </div> */}
        </>
      )}

      {/* User List */}
      

      <DashboardUsers/>

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={closeEditModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
            <button
              onClick={closeEditModal}
              className="absolute top-2 right-4 text-gray-600 text-3xl hover:text-gray-800"
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Delete User</h2>
            <p className="mb-4">Are you sure you want to delete {currentUser.name}?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={closeDeleteModal}
              className="absolute top-2 right-4 text-gray-600 text-3xl hover:text-gray-800"
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

export default DummyHome;
