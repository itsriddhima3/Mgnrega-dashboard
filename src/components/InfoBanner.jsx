import { Lightbulb } from 'lucide-react';

export function InfoBanner() {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 rounded-xl p-6 mt-6">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-blue-900 leading-relaxed">
          <strong className="font-semibold">Tip:</strong> This dashboard is currently displaying mock/demo data for development and testing purposes.
        </p>
      </div>
    </div>
  );
}

export default InfoBanner;
