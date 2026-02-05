import React from "react";

const VehiclePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Vehicle Usage Policy
        </h1>
        <p className="text-gray-500 mb-8">
          Effective Date: January 1, 2026
        </p>

        {/* Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            1. Purpose
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This policy outlines the rules and responsibilities for employees
            using company-owned or company-leased vehicles. The goal is to
            ensure safety, compliance, and proper vehicle maintenance.
          </p>
        </section>

        {/* Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            2. Authorized Drivers
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Only approved employees may operate company vehicles.</li>
            <li>A valid driver’s license is required at all times.</li>
            <li>Sharing vehicles with unauthorized individuals is prohibited.</li>
          </ul>
        </section>

        {/* Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            3. Vehicle Usage Guidelines
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Vehicles must be used for business purposes only.</li>
            <li>Seat belts must be worn by all occupants.</li>
            <li>Use of mobile phones while driving is not permitted.</li>
            <li>Smoking and illegal substances are strictly forbidden.</li>
          </ul>
        </section>

        {/* Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            4. Maintenance & Fuel
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Drivers are responsible for reporting mechanical issues promptly.
            Regular servicing, oil changes, and fuel expenses must follow
            company procedures.
          </p>
        </section>

        {/* Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            5. Accidents & Violations
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Any accident, damage, or traffic violation must be reported
            immediately to management. Failure to report incidents may result
            in disciplinary action.
          </p>
        </section>

        {/* Footer */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-500">
          <p>
            By using a company vehicle, you acknowledge that you have read and
            agree to comply with this policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehiclePolicy;
