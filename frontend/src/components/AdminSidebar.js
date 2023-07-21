import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      {/* Render the sidebar navigation links */}
      <nav>
        <ul>
          <li>
            <Link to="/ShowTask">Show Tasks</Link>
          </li>
          <li>
            <Link to="/RatingSummary">Rating Summary</Link>
          </li>
          <li>
            <Link to="/Add">Add Task</Link>
          </li>
          <li>
            <Link to="/Users">Manage Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
