import React, { useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateuserModal from '../../components/CreateuserModal';
import { Plus  } from 'lucide-react';


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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="col-span-3 p-6 pt-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium text-gray-800">Users</h2>

        {/* Add User Button (Top Right) */}
        <button
          onClick={openModal}
          className="px-4 py-2  flex gap-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          <Plus className='text-xs'/> Create User
        </button>
      </div>

     <div className="col-span-3 bg-white  pt-0">
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
            <td className="px-6 py-4 text-sm text-gray-800 flex space-x-3">
              <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-700 transition duration-200">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Create User</h2>

            <CreateuserModal closeModal={closeModal} />

            {/* Close Button */}
            {/* <button
              onClick={closeModal}
              className="absolute top-2 right-4 z-50 text-gray-600 text-3xl hover:text-gray-800"
              aria-label="Close Modal"
            >
              &times;
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
