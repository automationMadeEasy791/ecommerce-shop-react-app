// src/pages/ProfilePage.jsx

import React, { useState, useContext, useEffect } from "react";
import CenteredPageWrapper from "../components/CenteredPageWrapper";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Initialize form fields from context on mount / user change
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email cannot be empty");
      return;
    }

    // Update global user object
    updateUser({ ...user, name, email });
  };

  return (
    <CenteredPageWrapper>
      <h2 className="text-xl font-semibold mb-4 text-center">Your Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600 transition"
        >
          Update Profile
        </button>
      </div>
    </CenteredPageWrapper>
  );
};

export default ProfilePage;
