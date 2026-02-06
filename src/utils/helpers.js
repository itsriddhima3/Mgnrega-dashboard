export const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)} K`;
  return num.toString();
};

export const formatCurrency = (num) => {
  return `₹${formatNumber(num)}`;
};

export const calculateBudgetUtilization = (expenditure, budget) => {
  if (budget === 0) return 0;
  return ((expenditure / budget) * 100).toFixed(1);
};

export const getEmploymentStatus = (avgDays) => {
  if (avgDays >= 100) return 'Target Achieved';
  if (avgDays >= 75) return 'Good Progress';
  if (avgDays >= 50) return 'Needs Improvement';
  return 'Critical';
};

export const getBudgetStatus = (utilization) => {
  if (utilization >= 90) return 'Excellent';
  if (utilization >= 70) return 'Good';
  if (utilization >= 50) return 'Moderate';
  return 'Low';
};

export const generateInsights = (data, utilization) => {
  const insights = [];

  if (data.avgDays >= 100) {
    insights.push('District has achieved the minimum 100 days of employment guarantee');
  } else {
    insights.push(`District needs ${100 - data.avgDays} more days to meet the 100-day guarantee`);
  }

  if (utilization > 90) {
    insights.push('Excellent budget utilization - over 90% funds utilized');
  } else if (utilization > 70) {
    insights.push('Good budget utilization - can improve further');
  } else {
    insights.push('Low budget utilization - more funds can be deployed');
  }

  insights.push(`This data represents ${data.month} ${data.financial_year || '2024-25'} performance`);
  
  return insights;
};

export const calculatePerformanceDifference = (districtValue, stateValue) => {
  if (stateValue === 0) return 0;
  return ((districtValue - stateValue) / stateValue * 100).toFixed(1);
};