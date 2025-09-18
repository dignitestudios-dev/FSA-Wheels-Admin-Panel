import { FaUsers } from "react-icons/fa";
import { audi, hyundai, van } from "../../assets/export";  

const Inventory = () => {
  const cars = [
    {
      id: 1,
      name: "Audi E-tron GT",
      type: "Sedan",
      passengers: 4,
      image: audi,   },
    {
      id: 2,
      name: "Hyundai",
      type: "SUV",
      passengers: 6,
      image: hyundai,   },
    {
      id: 3,
      name: "Ford Van",
      type: "Sedan",
      passengers: 10,
      image: van,   },
  ];

  return (
    <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <h1 className="col-span-3 text-2xl font-semibold text-gray-800 ">Inventory Management</h1>
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white border border-gray-300 rounded-xl shadow p-4 flex flex-col"
        >
          {/* Car Image */}
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-32 object-contain"
          />

          {/* Car Details */}
          <div className="mt-3 border-t pt-3">
            <h2 className="text-base font-semibold text-gray-800">
              {car.name}
            </h2>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-500 text-sm">{car.type}</p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <FaUsers className="text-lg" /> {car.passengers}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
