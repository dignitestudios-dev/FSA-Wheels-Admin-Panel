import React, { useState, useEffect } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import CreateUserModal from '../../components/user/CreateUserModal';
import EditUserModal from '../../components/user/EditUserModal';
import DeleteUserModal from '../../components/user/DeleteUserModal';
import axios from '../../axios';
import { Search, X } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // NEW: Active / Inactive filter
  const [activeFilter, setActiveFilter] = useState('active');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // reset page on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async (page = 1, limit = 10) => {
      setLoading(true);
      try {
        const response = await axios.get('/user', {
          params: {
            page,
            limit,
            search: debouncedSearch,
            active: activeFilter === 'active' ? true : false,
          },
        });

        const { data } = response;
        setUsers(data.data.users);
        setTotalUsers(data.data.total);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(currentPage);
  }, [currentPage, debouncedSearch, activeFilter]);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteUser = () => {
    alert(`User ${currentUser.name} deleted.`);
    setIsDeleteModalOpen(false);
  };

  const handleViewUser = (user) =>
    navigate(`/app/user-details`, { state: { user } });

  const totalPages = Math.ceil(totalUsers / 10);

  return (
    <div className="col-span-3 p-6 pt-0">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-medium text-gray-800">Users</h2>
        </div>

{/* Add User Button */}
  <button
    onClick={() => navigate('/app/create-user')}
    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    <Plus size={16} />
    Add User
  </button>        
      </div>

      {/* Top bar */}
     {/* Top bar */}
<div className="flex justify-between items-center mb-4 gap-3">
  {/* Search */}
  <div className="relative w-full max-w-md">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search users by name, email, or membership..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />

    {search && (
      <button
        onClick={() => setSearch('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    )}
  </div>

  

  <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeFilter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setActiveFilter('inactive')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeFilter === 'inactive'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Inactive
          </button>
        </div>
</div>


      {/* Users Table */}
     {loading ? (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="w-full text-left table-auto">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Profile</th>
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Email</th>
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Address</th>
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Supervisor</th>
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Membership Number</th>
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Status</th>
          <th className="py-6 px-4 text-sm font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 8 }).map((_, idx) => (
          <tr key={idx} className="border-b animate-pulse">
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div className="h-4 bg-gray-300 rounded w-24" />
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="h-4 bg-gray-300 rounded w-40" />
            </td>
            <td className="py-4 px-4">
              <div className="h-4 bg-gray-300 rounded w-32" />
            </td>
            <td className="py-4 px-4">
              <div className="h-4 bg-gray-300 rounded w-28" />
            </td>
            <td className="py-4 px-4">
              <div className="h-4 bg-gray-300 rounded w-20" />
            </td>
            <td className="py-4 px-4">
              <div className="h-4 bg-gray-300 rounded w-24" />
            </td>
            <td className="py-4 px-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-md" />
                <div className="h-8 w-8 bg-gray-300 rounded-md" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) :
(
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Profile</th>
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Address</th>
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Supervisor</th>
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Membership Number</th>
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="py-6 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="py-4 px-4 text-sm text-gray-800 flex items-center gap-3">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                        {user.name
                          .split(' ')
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>
                    )}
                    <span>{user.name}</span>
                  </td>

                  <td className="py-2 px-4 text-sm text-gray-800">{user.email}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{user.address || 'Not Available'}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{user.supervisor}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{user.membershipNumber}</td>

                  <td className="py-2 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isDeactivatedByAdmin
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {user.isDeactivatedByAdmin ? 'Inactive' : 'Active'}
                    </span>
                  </td>

                  <td className="py-2 px-4 text-sm text-gray-800">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="px-3 py-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white border rounded-md"
                      >
                        <FaRegEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 space-x-4">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {isCreateModalOpen && <CreateUserModal closeModal={closeCreateModal} />}
      {isEditModalOpen && currentUser && (
        <EditUserModal currentUser={currentUser} closeModal={closeEditModal} />
      )}
      {isDeleteModalOpen && currentUser && (
        <DeleteUserModal
          currentUser={currentUser}
          handleDeleteUser={handleDeleteUser}
          closeModal={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default Users;
