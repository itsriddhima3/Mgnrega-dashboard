import { MapPin, Clock } from 'lucide-react';

export default function LocationBar({ districtName, lastUpdated }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary-500" />
        <span className="text-lg font-semibold text-gray-800">
          {districtName}, Uttar Pradesh
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>Last updated: {lastUpdated} 2024</span>
      </div>
    </div>
  );
}