import React from "react";

const TaskFilter = ({ completedFilter, ratingFilter, handleFilterChange }) => {
  return (
    <div>
      {/* Dropdown for completed filter */}
      <select
        value={completedFilter}
        onChange={(e) => handleFilterChange("completed", e.target.value)}
      >
        <option value="all">All</option> {/* Option to show all tasks */}
        <option value="completed">Completed</option> {/* Option to show only completed tasks */}
        <option value="incomplete">Incomplete</option> {/* Option to show only incomplete tasks */}
      </select>

      {/* Dropdown for rating filter */}
      <select
        value={ratingFilter}
        onChange={(e) => handleFilterChange("rating", e.target.value)}
      >
        <option value="all">All Ratings</option> {/* Option to show all ratings */}
        <option value="0">0%</option> {/* Option to show tasks with 0% rating */}
        <option value="25">25%</option> {/* Option to show tasks with 25% rating */}
        <option value="50">50%</option> {/* Option to show tasks with 50% rating */}
        <option value="75">75%</option> {/* Option to show tasks with 75% rating */}
        <option value="100">100%</option> {/* Option to show tasks with 100% rating */}
      </select>
    </div>
  );
};

export default TaskFilter;
