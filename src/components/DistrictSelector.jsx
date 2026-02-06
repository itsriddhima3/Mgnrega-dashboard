export default function DistrictSelector({ 
  states, 
  districts, 
  selectedState, 
  selectedDistrict, 
  onStateChange, 
  onDistrictChange 
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="state-select" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select State
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
          >
            {states.map((state) => (
              <option key={state.state_code} value={state.state_code}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label 
            htmlFor="district-select" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select District
          </label>
          <select
            id="district-select"
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
          >
            {districts.map((district) => (
              <option key={district.district_code} value={district.district_code}>
                {district.district_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}