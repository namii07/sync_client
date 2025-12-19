import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-mint min-h-screen p-4 hidden md:block">
      <ul className="flex flex-col gap-3">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/explore" className="hover:underline">
            Explore
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="hover:underline">
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
