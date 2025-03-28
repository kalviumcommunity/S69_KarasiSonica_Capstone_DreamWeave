import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { FiFilter, FiCalendar, FiBarChart2, FiPieChart } from "react-icons/fi";

const DreamAnalytics = ({ dreams }) => {
  const frequencyChartRef = useRef(null);
  const moodChartRef = useRef(null);
  const [timeRange, setTimeRange] = useState("monthly");
  const [chartType, setChartType] = useState("line");

  // Process dream data for charts
  const processData = () => {
    const moodCounts = {
      peaceful: 0,
      excited: 0,
      mysterious: 0,
      anxious: 0
    };

    const dateCounts = {};
    
    dreams.forEach(dream => {
      // Count moods
      if (dream.mood && moodCounts.hasOwnProperty(dream.mood)) {
        moodCounts[dream.mood]++;
      }
      
      // Group by date
      const date = dream.date ? dream.date.split('T')[0] : new Date().toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    return { moodCounts, dateCounts };
  };

  // Initialize/Update Charts
  useEffect(() => {
    const { moodCounts, dateCounts } = processData();
    
    // Dream Frequency Chart
    if (frequencyChartRef.current) {
      const chart = echarts.getInstanceByDom(frequencyChartRef.current) || 
                    echarts.init(frequencyChartRef.current);
      
      const dates = Object.keys(dateCounts).sort();
      const counts = dates.map(date => dateCounts[date]);
      
      chart.setOption({
        title: { 
          text: 'Your Dream Frequency',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: { type: 'value' },
        series: [{
          data: counts,
          type: chartType,
          smooth: true,
          areaStyle: chartType === 'line' ? {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(147, 51, 234, 0.5)' },
              { offset: 1, color: 'rgba(147, 51, 234, 0.1)' }
            ])
          } : undefined,
          color: '#9333EA'
        }]
      });
    }

    // Mood Distribution Chart
    if (moodChartRef.current) {
      const chart = echarts.getInstanceByDom(moodChartRef.current) || 
                    echarts.init(moodChartRef.current);
      
      chart.setOption({
        title: {
          text: 'Your Dream Moods',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          data: [
            { value: moodCounts.peaceful, name: 'Peaceful', itemStyle: { color: '#93C5FD' } },
            { value: moodCounts.excited, name: 'Excited', itemStyle: { color: '#FDE68A' } },
            { value: moodCounts.mysterious, name: 'Mysterious', itemStyle: { color: '#C4B5FD' } },
            { value: moodCounts.anxious, name: 'Anxious', itemStyle: { color: '#FCA5A5' } }
          ],
          radius: ['40%', '70%'],
          label: {
            show: true,
            formatter: '{b}: {c}'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });
    }

    return () => {
      frequencyChartRef.current && echarts.dispose(frequencyChartRef.current);
      moodChartRef.current && echarts.dispose(moodChartRef.current);
    };
  }, [dreams, timeRange, chartType]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
          <FiCalendar className="mr-2 text-purple-600" />
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent focus:outline-none"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        
        <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
          <FiBarChart2 className="mr-2 text-purple-600" />
          <select 
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-transparent focus:outline-none"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div ref={frequencyChartRef} className="w-full h-[400px]" />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div ref={moodChartRef} className="w-full h-[400px]" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Dream Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Total Dreams Recorded</p>
            <p className="text-2xl font-bold">{dreams.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Most Common Mood</p>
            <p className="text-2xl font-bold">
              {Object.entries({
                peaceful: dreams.filter(d => d.mood === 'peaceful').length,
                excited: dreams.filter(d => d.mood === 'excited').length,
                mysterious: dreams.filter(d => d.mood === 'mysterious').length,
                anxious: dreams.filter(d => d.mood === 'anxious').length
              }).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Most Active Day</p>
            <p className="text-2xl font-bold">
              {new Date(
                Object.entries(
                  dreams.reduce((acc, dream) => {
                    const date = dream.date.split('T')[0];
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                  }, {})
                ).reduce((a, b) => a[1] > b[1] ? a : b)[0]
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamAnalytics;