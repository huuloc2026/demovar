import React, { useState } from "react";

const Fetch = () => {
  const users = [
    { firstName: "John", id: 1 },
    { firstName: "Emily", id: 2 },
    { firstName: "Michael", id: 3 },
    { firstName: "Sarah", id: 4 },
    { firstName: "David", id: 5 },
    { firstName: "Jessica", id: 6 },
    { firstName: "Daniel", id: 7 },
    { firstName: "Olivia", id: 8 },
    { firstName: "Matthew", id: 9 },
    { firstName: "Sophia", id: 10 },
  ];

  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  // Filter users based on the searchItem
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Type to search"
      />
      <button className="border border-black p-2">Submit</button>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fetch;
