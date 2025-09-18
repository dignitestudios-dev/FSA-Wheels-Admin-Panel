import React, { useState } from 'react';
import { SuccessToast } from '../../components/global/Toaster';

const CreateUser = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User'
  }); // Form data for new user

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill out all fields.");
      return;
    }

    // Display user details as an example (or replace with API call to save user)
    console.log('New User Created:', newUser);

    // Reset the form
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'User'
    });

    SuccessToast("User Created Successfully!");
  };

  return (
    <div className="col-span-3 p-6 pt-0">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create User</h2>

      {/* User Creation Form */}
      <div className="bg-white p-6 mb-6 border border-gray-300 rounded-xl shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
