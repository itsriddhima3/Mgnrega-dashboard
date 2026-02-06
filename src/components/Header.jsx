import { Hammer } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Hammer className="w-8 h-8 text-[#2d3748]" />
          <h1 className="text-3xl font-bold text-gray-800">
            MGNREGA Dashboard
          </h1>
        </div>
        <p className="text-gray-600 text-sm">
          Mahatma Gandhi National Rural Employment Guarantee Act
        </p>
      </div>
    </header>
  );
}