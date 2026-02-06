export default function ViewToggle({ activeView, onViewChange }) {
  const views = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'trends', label: 'Historical Trends' },
    { id: 'comparison', label: 'Comparison' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-2">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === view.id
                ? 'bg-gradient-primary text-black shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-500 hover:text-primary-500'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}