import { useState, useEffect } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    setUsers([{ _id: "1", username: "Namisha" }]);
  }, []);

  return { users };
};
