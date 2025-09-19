// src/pages/UserDetailsPage.js
import React from 'react';
import { Link } from 'react-router';

const user = { 
  id: 1, 
  name: "John Doe", 
  email: "johndoe@example.com", 
  role: "Admin", 
  dateJoined: "2021-05-10", 
  lastLogin: "2022-07-14", 
  image: "https://randomuser.me/api/portraits/men/10.jpg",
  sos: {
    emergencyContact: "Jane Doe (Sister)",
    contactNumber: "+1234567890",
    isSOSActive: false,
  },
  rideHistory: [
    {
      rideDate: "2023-08-15",
      location: "New York, NY to Boston, MA",
      price: "$120.00",
      driverName: "Alice Smith",
    },
    {
      rideDate: "2023-09-01",
      location: "Chicago, IL to Detroit, MI",
      price: "$85.00",
      driverName: "Bob Johnson",
    },
    {
      rideDate: "2023-09-10",
      location: "Los Angeles, CA to San Francisco, CA",
      price: "$150.00",
      driverName: "Charlie Brown",
    }
  ]
};

const UserDetails = () => {
  return (
    <div className="container mx-auto p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">User Details</h2>
        {/* <Link to="/" className="text-blue-600 hover:text-blue-700 text-lg">Back to Users</Link> */}
      </div>

      <div className="bg-white p-8 rounded-xl shadow  border border-gray-200">
        <div className="flex items-center gap-8 mb-8">
          <img
            src={user.image || 'https://via.placeholder.com/100'}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
          />
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
            <p className="text-sm text-gray-600">Joined: {user.dateJoined}</p>
            <p className="text-sm text-gray-600">Last Login: {user.lastLogin}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">SOS Information</h4>
          <div className="text-sm text-gray-700">
            <p><span className="font-semibold">Emergency Contact:</span> {user.sos.emergencyContact}</p>
            <p><span className="font-semibold">Contact Number:</span> {user.sos.contactNumber}</p>
            <p><span className="font-semibold">SOS Status:</span> {user.sos.isSOSActive ? "Active" : "Inactive"}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Ride History</h4>
          {user.rideHistory.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200  shadow">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-3 text-gray-800">Ride Date</th>
                  <th className="px-6 py-3 text-gray-800">Location</th>
                  <th className="px-6 py-3 text-gray-800">Price</th>
                  <th className="px-6 py-3 text-gray-800">Driver</th>
                </tr>
              </thead>
              <tbody>
                {user.rideHistory.map((ride, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{ride.rideDate}</td>
                    <td className="px-6 py-4">{ride.location}</td>
                    <td className="px-6 py-4">{ride.price}</td>
                    <td className="px-6 py-4">{ride.driverName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No ride history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
