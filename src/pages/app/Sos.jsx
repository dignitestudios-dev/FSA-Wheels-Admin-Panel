import React, { useState, useEffect } from 'react';
import { MapPin, Phone, ShieldAlert } from 'lucide-react';
import axios from '../../axios';
import moment from 'moment';

const Sos = () => {
  const [sosRequests, setSosRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSosRequests = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/sos`);
      if (response.data.success) {
        setSosRequests(response.data.data.sosRequests);
        setTotalPages(response.data.data.pages);
      } else {
        setError('Failed to fetch SOS requests.');
      }
    } catch (err) {
      console.error('Error fetching SOS requests:', err);
      setError('Something went wrong while fetching SOS requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSosRequests(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="col-span-3 p-6 pt-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">SOS Requests</h2>
      </div>

      {/* SOS Request Cards */}
      <div className="grid gap-6">
        {loading ? (
          Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
              >
                <div className="h-5 bg-gray-200 w-1/3 mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 w-2/3 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
              </div>
            ))
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : sosRequests.length === 0 ? (
          <p className="text-gray-500 text-sm">No SOS requests found.</p>
        ) : (
          sosRequests.map((req, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                {/* Header Info */}
                <div className="flex items-center mb-5">
                  <img
                    src={req.user.profilePicture || 'https://via.placeholder.com/50'}
                    alt={req.user.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-blue-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{req.user.name}</h3>
                    <p className="text-sm text-gray-500">{req.user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {moment(req.createdAt).format('DD MMM YYYY, hh:mm A')}
                    </p>
                  </div>
                </div>

                {/* Status & Membership */}
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className="flex items-center bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full">
                    <ShieldAlert className="w-4 h-4 mr-1" />
                    {req.emergencyStatus.replace(/_/g, ' ')}
                  </span>
                  {/* <span className="text-sm text-gray-700">
                    AAA Membership: <span className="font-medium">{req.aaaMembershipNumber}</span>
                  </span> */}
                </div>

                {/* Location */}
                <a
                  href={`https://www.google.com/maps?q=${req.coordinates.latitude},${req.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 text-sm font-medium hover:underline mb-4"
                >
                  <MapPin className="w-4 h-4 mr-1" /> View Location on Google Maps
                </a>

                {/* User Details */}
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                  <p><span className="font-medium text-gray-800">Work:</span> {req.user.workContactNumber}</p>
                  <p><span className="font-medium text-gray-800">Personal:</span> {req.user.personalContactNumber}</p>
                  <p><span className="font-medium text-gray-800">Address:</span> {req.user.address}</p>
                  <p><span className="font-medium text-gray-800">Membership:</span> {req.user.membershipNumber}</p>
                  <p><span className="font-medium text-gray-800">Insurance:</span> {req.user.insuranceCompany}</p>
                                    <p><span className="font-medium text-gray-800">AAA Membersip:</span> {req.aaaMembershipNumber}</p>

                
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 px-4 py-2 rounded-md font-medium transition"
          >
            Previous
          </button>

          <span className="text-gray-800 font-semibold">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 px-4 py-2 rounded-md font-medium transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Sos;
