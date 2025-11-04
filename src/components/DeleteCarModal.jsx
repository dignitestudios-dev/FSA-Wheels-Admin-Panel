import React from "react";

const DeleteCarModal = ({ isOpen, onClose, handleDelete, carName, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-700 mb-6 text-center">
          Are you sure you want to delete the vehicle <strong>{carName}</strong>?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-1/2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCarModal;
