import { useState } from 'react';
import Header from './components/Header';
import LocationBar from './components/LocationBar';
import DistrictSelector from './components/DistrictSelector';
import ViewToggle from './components/ViewToggle';
import Filters from './components/Filters';
import Dashboard from './components/Dashboard';
import TrendsView from './components/TrendsView';
import ComparisonView from './components/ComparisonView';
import InfoBanner from './components/InfoBanner';
import Footer from './components/Footer.jsx';
import { mockDistrictData, states, districts, financialYears } from './data/mockData';

function App() {
  const [selectedState, setSelectedState] = useState('UP');
  const [selectedDistrict, setSelectedDistrict] = useState('UP_LKO');
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [activeView, setActiveView] = useState('dashboard');

  const currentData = mockDistrictData[selectedDistrict]?.[selectedYear];
  const districtName = mockDistrictData[selectedDistrict]?.name || 'Lucknow';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <LocationBar 
          districtName={districtName}
          lastUpdated={currentData?.month || 'October'}
        />

        <DistrictSelector
          states={states}
          districts={districts}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          onStateChange={setSelectedState}
          onDistrictChange={setSelectedDistrict}
        />

        <ViewToggle 
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <Filters
          years={financialYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {activeView === 'dashboard' && currentData && (
          <Dashboard 
            data={currentData}
            financialYear={selectedYear}
          />
        )}

        {activeView === 'trends' && currentData && (
          <TrendsView 
            data={currentData}
            districtName={districtName}
          />
        )}

        {activeView === 'comparison' && currentData && (
          <ComparisonView 
            districtData={currentData}
            districtName={districtName}
            financialYear={selectedYear}
          />
        )}
        <InfoBanner />
      </div>
      <Footer />
    </div>
  );
}

export default App;