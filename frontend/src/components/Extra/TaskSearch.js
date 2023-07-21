import React from "react";

const TaskSearch = ({ searchText, handleSearchChange }) => {
  return (
    <div>
      {/* Text input for task search */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search tasks"
      />
    </div>
  );
};

export default TaskSearch;
