import React from "react";

const Progress = ({ progress, status, startDate, dueDate }) => {
  const progressBarWidth = Math.max(0, Math.min(100, progress || 0));
  
  const getColor = () => {
    switch (status) {
      case 'In Progress':
        return "bg-cyan-500";
      case 'Completed':
        return "bg-indigo-500";
      default:
        return "bg-violet-500";
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`${getColor()} h-1.5 rounded-full transition-all duration-300`}
          style={{ width: `${progressBarWidth}%` }}
        >
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <div>
          <div>Start Date</div>
          <div className="font-medium">{startDate || '19th May 2025'}</div>
        </div>
        <div className="text-right">
          <div>Due Date</div>
          <div className="font-medium">{dueDate || '1st Feb 2025'}</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
