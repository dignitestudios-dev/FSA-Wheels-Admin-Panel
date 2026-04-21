import React, { useState } from 'react';
import { Search } from 'lucide-react';

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

  // STATIC DATA (simulate trips)
  const data = [
    {
      id: 1,
      clientName: 'Test User 1',
      caseAide: 'John Doe',
      startOdo: 12000,
      endOdo: 12025,
      startLocation: 'Office',
      visit: 'City Hospital',
      pickups: ['ABC Street', 'DEF Street', 'GHI Street'],
      dropoffs: ['XYZ Street', 'LMN Street'],
      mileage: 25,
      clientAddress: 'Main Street',
      childrenAddresses: ['Child 1 Address', 'Child 2 Address'],
    },
    {
      id: 2,
      clientName: 'Test User 2',
      caseAide: 'Jane Smith',
      startOdo: 15000,
      endOdo: 15040,
      startLocation: 'Office',
      visit: 'Central Clinic',
      pickups: ['AAA Street', 'BBB Street'],
      dropoffs: ['CCC Street'],
      mileage: 40,
      clientAddress: 'Second Street',
      childrenAddresses: ['Child A Address'],
    },
  ];

  // FILTER
  const filteredData = data.filter((d) =>
    d.clientName.toLowerCase().includes(clientFilter.toLowerCase())
  );

  // REPORT ENGINE
  const buildReport = () => {
    switch (activeType) {
      // 1. Pickup Summary (ONLY FIRST PICKUP)
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
          rows: filteredData.map((r) => [
            r.clientName,
            r.startOdo,
            r.pickups[0],
            r.visit,
            r.mileage,
            r.endOdo,
          ]),
        };

      // 2. Drop-off Summary (ONLY LAST DROP)
      case 1:
        return {
          columns: [
            'Client',
            'Start Odo',
            'Visit',
            'Final Drop-off',
            'Mileage',
            'End Odo',
          ],
          rows: filteredData.map((r) => [
            r.clientName,
            r.startOdo,
            r.visit,
            r.dropoffs[r.dropoffs.length - 1],
            r.mileage,
            r.endOdo,
          ]),
        };

      // 3. Mileage Summary (GROUPED)
      case 2: {
        const grouped = {};

        filteredData.forEach((r) => {
          const key = `${r.caseAide}-${r.clientName}`;
          if (!grouped[key]) {
            grouped[key] = {
              caseAide: r.caseAide,
              client: r.clientName,
              mileage: 0,
            };
          }
          grouped[key].mileage += r.mileage;
        });

        return {
          columns: ['Case Aide', 'Client', 'Total Mileage'],
          rows: Object.values(grouped).map((g) => [
            g.caseAide,
            g.client,
            g.mileage,
          ]),
        };
      }

      // 4. Full Pickup Route (ALL PICKUPS SHOWN)
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
          rows: filteredData.map((r) => [
            r.caseAide,
            r.clientName,
            r.startOdo,
            r.startLocation,
            r.pickups.join(', '),
            r.visit,
            r.mileage,
            r.endOdo,
          ]),
        };

      // 5. Full Drop-off Route (ALL DROPOFFS SHOWN)
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
          rows: filteredData.map((r) => [
            r.caseAide,
            r.clientName,
            r.startOdo,
            r.visit,
            r.dropoffs.join(', '),
            r.mileage,
            r.endOdo,
          ]),
        };

      // 6. Case Aide Usage (CLIENT LIST GROUPED)
      case 5: {
        const grouped = {};

        filteredData.forEach((r) => {
          if (!grouped[r.caseAide]) {
            grouped[r.caseAide] = new Set();
          }
          grouped[r.caseAide].add(r.clientName);
        });

        return {
          columns: ['Case Aide', 'Clients Transported'],
          rows: Object.entries(grouped).map(([aide, clients]) => [
            aide,
            Array.from(clients).join(', '),
          ]),
        };
      }

      // 7. Client Address Registry
      case 6:
        return {
          columns: ['Client', 'Client Address', 'Children Addresses'],
          rows: filteredData.map((r) => [
            r.clientName,
            r.clientAddress,
            r.childrenAddresses.join(', '),
          ]),
        };

      default:
        return { columns: [], rows: [] };
    }
  };

  const { columns, rows } = buildReport();

  return (
    <div className="p-6 pt-0">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reports
        </h2>

        {/* SEARCH FILTER */}
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            placeholder="Filter by client..."
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* REPORT TYPE FILTERS */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {reportTypes.map((type, i) => (
          <button
            key={i}
            onClick={() => setActiveType(i)}
            className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition ${
              activeType === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="py-3 px-4 text-sm font-semibold text-gray-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="py-3 px-4 text-sm text-gray-800"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;