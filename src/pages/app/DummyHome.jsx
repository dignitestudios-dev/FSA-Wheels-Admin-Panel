import { FaUsers, FaDollarSign, FaCalendarCheck, FaEdit, FaTrash } from "react-icons/fa";

const DummyHome = () => {
  // Example data for the dashboard
  const stats = {
    totalUsers: 1200,
    totalRevenue: 350000,
    totalReservations: 540,
  };

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

  return (
    <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <h1 className="col-span-3 text-3xl font-semibold text-gray-800 ">Dashboard</h1>

      {/* Stat Cards */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        <FaUsers className="text-4xl text-blue-600" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <FaDollarSign className="text-4xl text-green-500" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all transform hover:scale-105">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Reservations</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalReservations}</p>
        </div>
        <FaCalendarCheck className="text-4xl text-yellow-500" />
      </div>

      {/* User List */}
      <div className="col-span-3 bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
        <h2 className="text-2xl font-medium text-gray-800 p-6">Users</h2>
        <div className="overflow-x-auto">
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
    </div>
  );
};

export default DummyHome;
