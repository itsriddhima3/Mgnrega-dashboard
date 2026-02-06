import { Users, Calendar, Clock, Wallet, CheckCircle, Loader, TrendingUp, AlertCircle, Zap, Heart } from 'lucide-react';
import { formatNumber, formatCurrency, calculateBudgetUtilization, generateInsights } from '../utils/helpers';

export default function Dashboard({ data, financialYear }) {
  const utilization = calculateBudgetUtilization(data.expenditure, data.budget);
  const insights = generateInsights(data, utilization);
  const totalWorks = data.worksCompleted + data.worksOngoing;

  const metrics = [
    {
      icon: Users,
      title: 'Total Job Cards',
      value: formatNumber(data.jobCards),
      label: 'Active households enrolled',
      gradient: 'from-blue-600 to-purple-600',
      bgColor: 'bg-gradient-to-br'
    },
    {
      icon: Calendar,
      title: 'Person-Days Generated',
      value: formatNumber(data.personDays),
      label: 'Employment provided',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br'
    },
    {
      icon: Clock,
      title: 'Avg. Days per Household',
      value: data.avgDays,
      label: data.avgDays >= 100 ? '✅ Target achieved' : `${100 - data.avgDays} days to target`,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br'
    },
    {
      icon: Wallet,
      title: 'Total Expenditure',
      value: formatCurrency(data.expenditure),
      label: 'Funds utilized',
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-gradient-to-br'
    }
  ];

  const worksStatusItems = [
    {
      icon: CheckCircle,
      value: data.worksCompleted,
      label: 'Works Completed',
      borderColor: 'border-green-500',
      iconColor: 'text-green-500'
    },
    {
      icon: Loader,
      value: data.worksOngoing,
      label: 'Works Ongoing',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      value: totalWorks,
      label: 'Total Works',
      borderColor: 'border-purple-500',
      iconColor: 'text-purple-500'
    }
  ];

  const insightIcons = [AlertCircle, Zap, Heart];

  return (
    <div className="w-full bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          District Performance Overview
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          Financial Year: {financialYear} | Month: {data.month}
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className={`${metric.bgColor} ${metric.gradient} text-white rounded-lg sm:rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm opacity-90 mb-2 font-medium">{metric.title}</h3>
                    <p className="text-2xl sm:text-3xl font-bold mb-1 break-words">{metric.value}</p>
                    <span className="text-xs opacity-80 block truncate">{metric.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-5 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Budget Utilization</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="font-semibold text-gray-700 text-sm">Allocated:</span>
              <span className="font-bold text-gray-900 text-base">{formatCurrency(data.budget)}</span>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="font-semibold text-gray-700 text-sm">Utilized:</span>
              <span className="font-bold text-gray-900 text-base">{formatCurrency(data.expenditure)}</span>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="font-semibold text-gray-700 text-sm">Percentage:</span>
              <span className="font-bold text-green-600 text-base">{utilization}%</span>
            </div>
          </div>
          <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${utilization}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Works Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {worksStatusItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-5 sm:p-6 text-center border-l-4 ${item.borderColor} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <IconComponent className={`w-10 h-10 ${item.iconColor} mx-auto mb-3`} />
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{item.value}</div>
                  <div className="text-gray-700 font-semibold text-sm sm:text-base">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded flex items-center justify-center font-bold text-sm">
              📊
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Key Insights</h3>
          </div>
          <div className="space-y-3 sm:space-y-3">
            {insights.map((insight, index) => {
              const IconComponent = insightIcons[index % insightIcons.length];
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-gray-700 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{insight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}