import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend} <span className="text-slate-400">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-4 rounded-xl ${color || 'bg-indigo-50 text-indigo-600'}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

export default StatsCard;
