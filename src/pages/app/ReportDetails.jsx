import React, { useState } from 'react';
import { useLocation } from 'react-router';
import {
  MapPin,
  Building2,
  Car,
  User,
  Gauge,
  Route,
} from 'lucide-react';

const tabs = [
  'Pickup Summary',
  'Drop-off Summary',
  'Mileage',
  'Full Pickup',
  'Full Drop-off',
  'Usage',
  'Address Registry',
];

const InfoCard = ({ label, value, icon: Icon }) => (
  <div className="bg-gray-50 border rounded-lg p-4 flex items-start gap-3">
    {Icon && <Icon size={18} className="text-blue-600 mt-1" />}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

const RowItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <Icon size={16} className="text-gray-500" />
    <span>{text}</span>
  </div>
);

const ReportDetails = () => {
  const { state } = useLocation();
  const report = state?.report;

  const [activeTab, setActiveTab] = useState(0);

  if (!report) {
    return <div className="p-6">No report data found</div>;
  }

  return (
    <div className="p-6 pt-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Report Details
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1">
              <User size={14} /> {report.clientName}
            </span>
            <span className="flex items-center gap-1">
              <Route size={14} /> {report.rideDate}
            </span>
            <span className="flex items-center gap-1">
              <Car size={14} /> {report.vehicle}
            </span>
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Export
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6 flex gap-6 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-3 text-sm font-medium whitespace-nowrap transition ${
              activeTab === index
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">

        {/* 1. Pickup Summary */}
        {activeTab === 0 && (
          <>
            <Section title="Trip Overview">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <InfoCard label="Client" value={report.clientName} icon={User} />
                <InfoCard label="Start Odometer" value="12000" icon={Gauge} />
                <InfoCard label="End Odometer" value="12025" icon={Gauge} />
                <InfoCard label="Total Mileage" value="25 miles" icon={Route} />
              </div>
            </Section>

            <Section title="Route">
              <div className="space-y-2">
                <RowItem icon={MapPin} text="1st Pickup: ABC Street" />
                <RowItem icon={Building2} text="Visit Location: City Hospital" />
              </div>
            </Section>
          </>
        )}

        {/* 2. Drop-off Summary */}
        {activeTab === 1 && (
          <>
            <Section title="Trip Overview">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <InfoCard label="Client" value={report.clientName} icon={User} />
                <InfoCard label="Start Odometer" value="12000" icon={Gauge} />
                <InfoCard label="End Odometer" value="12025" icon={Gauge} />
                <InfoCard label="Total Mileage" value="25 miles" icon={Route} />
              </div>
            </Section>

            <Section title="Route">
              <div className="space-y-2">
                <RowItem icon={Building2} text="Visit Location: City Hospital" />
                <RowItem icon={MapPin} text="Final Drop-off: XYZ Street" />
              </div>
            </Section>
          </>
        )}

        {/* 3. Mileage */}
        {activeTab === 2 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <InfoCard label="Case Aide" value="John Doe" icon={User} />
            <InfoCard label="Client" value={report.clientName} icon={User} />
            <InfoCard label="Total Mileage" value="25 miles" icon={Route} />
          </div>
        )}

        {/* 4. Full Pickup */}
        {activeTab === 3 && (
          <>
            <Section title="Trip Info">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard label="Case Aide" value="John Doe" icon={User} />
                <InfoCard label="Start Odometer" value="12000" icon={Gauge} />
                <InfoCard label="End Odometer" value="12025" icon={Gauge} />
                <InfoCard label="Total Mileage" value="25 miles" icon={Route} />
              </div>
            </Section>

            <Section title="Route Details">
              <div className="space-y-2">
                <RowItem icon={Car} text="Start: Office" />
                <RowItem icon={MapPin} text="Pickup: ABC Street" />
                <RowItem icon={MapPin} text="Pickup: DEF Street" />
                <RowItem icon={MapPin} text="Pickup: GHI Street" />
                <RowItem icon={Building2} text="Visit: City Hospital" />
              </div>
            </Section>
          </>
        )}

        {/* 5. Full Drop-off */}
        {activeTab === 4 && (
          <>
            <Section title="Trip Info">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard label="Case Aide" value="John Doe" icon={User} />
                <InfoCard label="Start Odometer" value="12000" icon={Gauge} />
                <InfoCard label="End Odometer" value="12025" icon={Gauge} />
                <InfoCard label="Total Mileage" value="25 miles" icon={Route} />
              </div>
            </Section>

            <Section title="Route Details">
              <div className="space-y-2">
                <RowItem icon={Building2} text="Visit: City Hospital" />
                <RowItem icon={MapPin} text="Drop-off: ABC Street" />
                <RowItem icon={MapPin} text="Drop-off: DEF Street" />
                <RowItem icon={MapPin} text="Drop-off: GHI Street" />
              </div>
            </Section>
          </>
        )}

        {/* 6. Usage */}
        {activeTab === 5 && (
          <>
            <Section title="Case Aide">
              <InfoCard label="Name" value="John Doe" icon={User} />
            </Section>

            <Section title="Clients Transported">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Test User 1</li>
                <li>Test User 2</li>
                <li>Test User 3</li>
              </ul>
            </Section>
          </>
        )}

        {/* 7. Address Registry */}
        {activeTab === 6 && (
          <>
            <Section title="Client">
              <div className="grid grid-cols-2 gap-4">
                <InfoCard label="Name" value={report.clientName} icon={User} />
                <InfoCard label="Address" value="Main Street" icon={MapPin} />
              </div>
            </Section>

            <Section title="Children Addresses">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Child 1: ABC Street</li>
                <li>Child 2: XYZ Street</li>
              </ul>
            </Section>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;