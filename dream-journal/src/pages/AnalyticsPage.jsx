import DreamAnalytics from "../components/dreams/DreamAnalytics";

const AnalyticsPage = ({ dreams }) => {
  return (
    <div className="pt-24 pb-12 px-6"> {/* Adjusted padding for navbar */}
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
        Your Dream Analytics
      </h1>
      <DreamAnalytics dreams={dreams} />
    </div>
  );
};

export default AnalyticsPage;