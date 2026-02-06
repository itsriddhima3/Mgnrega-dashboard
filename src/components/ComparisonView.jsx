import { Building2, BarChart3, TrendingUp, ArrowUp, ArrowDown, CheckCircle, AlertCircle } from 'lucide-react';
import { formatNumber, formatCurrency, calculateBudgetUtilization, calculatePerformanceDifference } from '../utils/helpers';
import { stateAverage } from '../data/mockData';

export default function ComparisonView({ districtData, districtName, financialYear }) {
  const stateAvg = stateAverage[financialYear];
  const districtUtilization = calculateBudgetUtilization(districtData.expenditure, districtData.budget);

  const personDaysDiff = calculatePerformanceDifference(districtData.personDays, stateAvg.personDays);
  const avgDaysDiff = calculatePerformanceDifference(districtData.avgDays, stateAvg.avgDays);
  const expenditureDiff = calculatePerformanceDifference(districtData.expenditure, stateAvg.expenditure);

  const metrics = [
    { label: 'Person-Days Generated', districtValue: formatNumber(districtData.personDays), stateValue: formatNumber(stateAvg.personDays) },
    { label: 'Avg Days per Household', districtValue: districtData.avgDays, stateValue: stateAvg.avgDays },
    { label: 'Total Expenditure', districtValue: formatCurrency(districtData.expenditure), stateValue: formatCurrency(stateAvg.expenditure) },
    { label: 'Budget Utilization', districtValue: `${districtUtilization}%`, stateValue: `${stateAvg.budgetUtilization}%` }
  ];

  const differences = [
    { label: 'Person-Days Difference', value: personDaysDiff, positive: personDaysDiff > 0 },
    { label: 'Avg Days Difference', value: avgDaysDiff, positive: avgDaysDiff > 0 },
    { label: 'Expenditure Difference', value: expenditureDiff, positive: expenditureDiff > 0 },
    { label: 'Overall Status', value: districtData.personDays > stateAvg.personDays ? 'Above Average' : 'Below Average', positive: districtData.personDays > stateAvg.personDays }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        District vs State Average Comparison
      </h2>
      <p className="text-gray-600 mb-8">
        {districtName} vs State Average - Financial Year: {financialYear}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-500" />
            {districtName} District
          </h3>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">{metric.label}</span>
                <span className="text-gray-800 font-bold">{metric.districtValue}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            State Average
          </h3>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">{metric.label}</span>
                <span className="text-gray-800 font-bold">{metric.stateValue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          Performance Difference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {differences.map((diff, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">{diff.label}</div>
              <div className="flex items-center gap-2">
                {typeof diff.value === 'number' ? (
                  <>
                    <span className={`text-2xl font-bold ${diff.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {diff.value > 0 ? '+' : ''}{diff.value}%
                    </span>
                    {diff.positive ? (
                      <ArrowUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-red-600" />
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    {diff.positive ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                    )}
                    <span className={`text-lg font-semibold ${diff.positive ? 'text-green-600' : 'text-orange-600'}`}>
                      {diff.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Visual Comparison</h3>
        <div className="space-y-6">
          {[
            { label: 'Person-Days Generated', district: districtData.personDays, state: stateAvg.personDays, max: Math.max(districtData.personDays, stateAvg.personDays) },
            { label: 'Avg Days per Household', district: districtData.avgDays, state: stateAvg.avgDays, max: 100 }
          ].map((item, index) => (
            <div key={index}>
              <div className="text-sm font-semibold text-gray-700 mb-2">{item.label}</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{districtName}</span>
                    <span>{item.district.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${(item.district / item.max) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>State Average</span>
                    <span>{item.state.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                      style={{ width: `${(item.state / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}