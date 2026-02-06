export default function TrendsView({ data, districtName }) {
  if (!data.trends || data.trends.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-600">No trend data available for this year</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.trends.map(t => t.value));

  return (
    <div className="bg-white rounded-xl shadow-md p-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Historical Employment Trends
      </h2>
      <p className="text-gray-600 mb-8">
        Person-days generated over time - {districtName}
      </p>

      <div className="bg-gray-50 rounded-xl p-8 mb-8 overflow-x-auto">
        <div className="flex items-end justify-around h-80 gap-2 min-w-[600px]">
          {data.trends.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full bg-purple-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer flex items-start justify-center pt-2 relative group"
                  style={{ height: `${height}%`, minHeight: '40px' }}
                >
                  <span className="text-white text-xs font-semibold">
                    {(item.value / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-medium">
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Trend Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Person-Days</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Growth</th>
              </tr>
            </thead>
            <tbody>
              {data.trends.map((item, index) => {
                const prevValue = index > 0 ? data.trends[index - 1].value : item.value;
                const growth = index > 0 ? (((item.value - prevValue) / prevValue) * 100).toFixed(1) : 0;
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-100">
                    <td className="py-3 px-4 text-gray-800">{item.month}</td>
                    <td className="py-3 px-4 text-right text-gray-800 font-medium">
                      {item.value.toLocaleString()}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}