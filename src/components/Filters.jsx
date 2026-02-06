export default function Filters({ years, selectedYear, onYearChange }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center gap-4">
        <label 
          htmlFor="year-select" 
          className="font-semibold text-gray-700 min-w-fit"
        >
          Financial Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}