import { ArrowLeft } from 'lucide-react';
import React, { use } from 'react';
import { useLocation, useNavigate } from 'react-router';

const UserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          No user data found.{' '}
          <button className="text-blue-600 underline" onClick={() => navigate(-1)}>Go back</button>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-0 space-y-8">
      {/* Header */}
      <div className="flex items-center ">
         {/* <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-md font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
        </button> */}
        <h2 className="text-3xl font-bold text-gray-900">User Profile</h2>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl  border border-gray-200 p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b pb-6 mb-6">
          {user.profilePicture ? (
    <img
      src={user.profilePicture}
      alt={user.name}
      className="w-36 h-36 rounded-full object-cover"
    />
  ) : (
    <div className="w-36 h-36 rounded-full bg-blue-500 flex items-center justify-center text-white text-6xl">
      {user.name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2) // Get the initials (first 2 letters)
        .join('')
        .toUpperCase()}
    </div>
  )}
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Supervisor: {user.supervisor || 'N/A'}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Membership: {user.membershipNumber || 'N/A'}</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Created: {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800">Contact Information</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Work Contact:</strong> {user.workContactNumber || 'N/A'}</li>
              <li><strong>Personal Contact:</strong> {user.personalContactNumber || 'N/A'}</li>
              <li><strong>Address:</strong> {user.address || 'N/A'}</li>
              <li>
                <strong>Notifications:</strong>{' '}
                <span className={`font-medium ${user.isNotificationEnabled ? 'text-green-600' : 'text-red-500'}`}>
                  {user.isNotificationEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </li>
            </ul>
          </div>

          {/* Location Info */}
          <div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800">Location</h4>
<ul className="space-y-2 text-sm text-gray-700">
  {user.location?.coordinates?.length === 2 ? (
    <div>
    <li>
      <button
        onClick={() => {
          const lat = user.location.coordinates[1];
          const lng = user.location.coordinates[0];
          const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
          window.open(googleMapsUrl, '_blank');
        }}
        className="text-blue-600 underline hover:text-blue-800"
      >
        View Location on Google Maps
      </button>
    </li>
    <div className='flex gap-1 mt-2'>
    <li className='font-bold'>Address: </li><span>{user?.address || 'N/A'}</span>
    </div>
    </div>
  ) : (
    <li>Location: N/A</li>
  )}
</ul>

          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Driving License */}
          <div>
            <h4 className="text-xl font-semibold  text-gray-800">Driving License</h4>
            <p className="text-sm text-gray-700 mb-2">License #: {user.drivingLicenseNumber || 'N/A'}</p>
            <div className="flex gap-4">
              {user.drivingLicenseFrontImage ? (
                <img src={user.drivingLicenseFrontImage} alt="Front" className="w-36 h-24 object-cover border rounded-lg" />
              ) : (
                <div className="text-sm text-gray-500">No front image</div>
              )}
              {user.drivingLicenseBackImage ? (
                <img src={user.drivingLicenseBackImage} alt="Back" className="w-36 h-24 object-cover border rounded-lg" />
              ) : (
                <div className="text-sm text-gray-500">No back image</div>
              )}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <h4 className="text-xl font-semibold  text-gray-800">Insurance</h4>
            <p className="text-sm text-gray-700 mb-2">Company: {user.insuranceCompany || 'N/A'}</p>
            {user.insuranceCertificateImage ? (
              <img src={user.insuranceCertificateImage} alt="Insurance" className="w-40 h-28 object-cover border rounded-lg" />
            ) : (
              <div className="text-sm text-gray-500">No certificate image</div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 ">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <h5 className="text-sm text-gray-500 font-medium">Total Rides</h5>
            <p className="text-3xl font-bold text-gray-500">{user.totalRides}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <h5 className="text-sm text-gray-500 font-medium">Current Reservations</h5>
            <p className="text-3xl font-bold text-gray-500">{user.totalCurrentReservations}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <h5 className="text-sm text-gray-500 font-medium">Ride Cancellations</h5>
            <p className="text-3xl font-bold text-gray-500">{user.totalRideCancellations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
