import React, { useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router';
import CreateuserModal from '../../components/CreateuserModal';
import { FileSpreadsheet, Plus, StickyNote } from 'lucide-react';
import { FaRegEye } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";



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

const Users = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();  // Initialize the navigation hook

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

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

  return (
    <div className="col-span-3 p-6 pt-0">
      <div className="flex justify-between items-center mb-4">
        <div>
        <h2 className="text-2xl font-medium text-gray-800">Users</h2>
        </div>

         <div className='flex gap-4'>
           <button
          className="px-4 py-2 flex gap-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          <StickyNote  className='text-xs' /> Export CSV
        </button>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 flex gap-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          <Plus className='text-xs' /> Create User
        </button>
       
        </div>
      </div>
      

      <div className="col-span-3 bg-white pt-0">
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Profile</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date Joined</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Last Login</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-3">
                    <img
                      src={user.image || 'https://via.placeholder.com/40'}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span>{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.dateJoined}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.lastLogin}</td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="flex items-center justify-start gap-3">
                      {/* View Button */}
                      <button
                        onClick={() => handleViewUser(user.id)}  // Navigate to user details page
                        aria-label="View"
                        className="flex items-center justify-center w-8 h-8 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
                      >
                        <FaRegEye />

                      </button>
                      {/* Edit Button */}
                      {/* <button
                        onClick={() => openEditModal(user)}
                        aria-label="Edit"
                        className="flex items-center justify-center w-8 h-8 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
                      >
                        <FaEdit className="text-base" />
                      </button> */}
                      {/* Delete Button */}
                      {/* <button
                        onClick={() => openDeleteModal(user)}
                        aria-label="Delete"
                        className="flex items-center justify-center w-8 h-8 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200"
                      >
                        <FaTrash className="text-base" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Create User</h2>
            <CreateuserModal closeModal={closeCreateModal} />
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Edit User</h2>
            {/* Add form elements to edit the user details */}
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
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
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

export default Users;
