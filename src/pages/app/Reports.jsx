import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Search } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';  // Import skeleton loader

const reportTypes = [
  'Pickup Summary',
  'Drop-off Summary',
  'Mileage Summary',
  'Full Pickup Route',
  'Full Drop-off Route',
  'Case Aide Usage',
  'Client Address Registry',
];

const Reports = () => {
  const [activeType, setActiveType] = useState(0);
  const [clientFilter, setClientFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [apiData, setApiData] = useState([]);
  const [loadingState, setLoadingState] = useState({}); // Track loading state per report type

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;

  // ✅ Debounce (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(clientFilter);
      setCurrentPage(1); // reset page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [clientFilter]);

  // ✅ API CALL
  useEffect(() => {
    const fetchData = async () => {
      setLoadingState((prev) => ({ ...prev, [activeType]: true })); // Set loading for the active report type
      try {
        let endpoint = '';

        // Determine the API endpoint based on the active report type
        if (activeType === 0) {
          endpoint = '/admin/report/initial-pickup';
        } else if (activeType === 1) {
          endpoint = '/admin/report/final-dropoff';
        } else if (activeType === 2) {
          endpoint = '/admin/report/driver-mileage';
        } else if (activeType === 3) {
          endpoint = '/admin/report/pickup-details';
        } else if (activeType === 4) {
          endpoint = '/admin/report/dropoff-details';
        } else if (activeType === 5) {
          endpoint = '/admin/report/client-usage';
        } else if (activeType === 6) {
          endpoint = '/admin/report/client-address';
        } else {
          setApiData([]);
          setLoadingState((prev) => ({ ...prev, [activeType]: false })); // End loading if no report type
          return;
        }

        const res = await axios.get(endpoint, {
          params: {
            page: currentPage,
            limit,
            ...(debouncedSearch && { clientName: debouncedSearch,  vehicleName: debouncedSearch }), // ✅ SEARCH PARAM
          },
        });

        setApiData(res.data?.data || []);
        setTotalItems(res.data?.pagination?.totalItems || 0);
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoadingState((prev) => ({ ...prev, [activeType]: false })); // End loading for the active report type
      }
    };

    fetchData();
  }, [activeType, currentPage, debouncedSearch]);

  // ✅ REPORT BUILDER (NO FRONTEND FILTERING)
  const buildReport = () => {
    switch (activeType) {
      case 0:
        return {
          columns: [
            'Client',
            'Start Odo',
            '1st Pickup',
            'Visit',
            'Mileage',
            'End Odo',
          ],
          rows: apiData.map((r) => [
            r.clientName || '-',
            '-',
            r.firstPickupAddress || '-',
            r.visitLocation || '-',
            r.totalDistance ?? '-',
            '-',
          ]),
        };

      case 1:
        return {
          columns: [
            'Client',
            'Visit Location',
            'Final Drop-off',
            'Mileage',
            'Date',
          ],
          rows: apiData.map((r) => [
            r.clientName || '-',
            r.visitLocation || '-',
            r.finalDropOffAddress || '-',
            r.totalDistance ?? '-',
            r.createdAt
              ? new Date(r.createdAt).toLocaleDateString()
              : '-',
          ]),
        };

      case 2:
        return {
          columns: ['Case Aide', 'Vehicle', 'Total Mileage'],
          rows: apiData.map((r) => [
            r.userName || '-',
            r.vehicleName || '-',
            r.totalMileage ?? '-',
          ]),
        };

      case 3:
        return {
          columns: [
            'Case Aide',
            'Client',
            'Start Odo',
            'Start Location',
            'All Pickups',
            'Visit',
            'Mileage',
            'End Odo',
          ],
          rows: apiData.map((r) => [
            r.vehicleName || '-',
            r.clientName || '-',
            r.startOdo ?? '-',
            r.startLocation || '-',
            (r.pickupAddresses || []).join(', '),
            r.visitLocation || '-',
            r.totalDistance ?? '-',
            r.endOdo ?? '-',
          ]),
        };

      case 4:
        return {
          columns: [
            'Case Aide',
            'Client',
            'Start Odo',
            'Visit',
            'All Drop-offs',
            'Mileage',
            'End Odo',
          ],
          rows: apiData.map((r) => [
            r.vehicleName || '-',
            r.clientName || '-',
            r.startOdo ?? '-',
            r.visitLocation || '-',
            (r.pickupAddresses || []).join(', '),
            r.totalDistance ?? '-',
            r.endOdo ?? '-',
          ]),
        };

      case 5:
        return {
          columns: ['Case Aide', 'Clients'],
          rows: apiData.map((r) => [
            r.userName || '-',
            r.vehicleName || '-',
          ]),
        };

      case 6:
        return {
          columns: ['Client', 'Client Address', 'Children Addresses'],
          rows: apiData.map((r) => [
            r.clientName || '-',
            r.clientAddress || '-',
            (r.pickupAddresses || []).join(', '),

          ]),
        };

      default:
        return { columns: [], rows: [] };
    }
  };

  const { columns, rows } = buildReport();
  const totalPages = Math.ceil(totalItems / limit);

  const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  return (
    <table className="w-full animate-pulse">
      <thead>
        <tr className="bg-gray-100">
          {Array(columns)
            .fill(0)
            .map((_, i) => (
              <th key={i} className="p-3">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {Array(rows)
          .fill(0)
          .map((_, i) => (
            <tr key={i} className="border-t">
              {Array(columns)
                .fill(0)
                .map((_, j) => (
                  <td key={j} className="p-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

  return (
    <div className="p-6 pt-0">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Reports</h2>

        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            placeholder="Search client..."
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {reportTypes.map((type, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveType(i);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm ${activeType === i ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-x-auto">
       {loadingState[activeType] ? (
  <div className="p-4">
    <TableSkeleton
      columns={columns.length || 5}
      rows={5}
    />
  </div>
) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col, i) => (
                  <th key={i} className="p-3 text-left text-sm text-gray-600">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-sm">
                      {cell ?? '-'}
                    </td>
                  ))}
                </tr>
              ))}

              {!rows.length && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-6 text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
          >
            Prev
          </button>

          <span className="text-sm mt-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;