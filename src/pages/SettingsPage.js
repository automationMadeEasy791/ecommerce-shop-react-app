import React, { useState } from "react";
import CenteredPageWrapper from "../components/CenteredPageWrapper";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSave = () => {
    localStorage.setItem(
      "appSettings",
      JSON.stringify({ darkMode, emailNotifications })
    );
    toast.success("Settings saved!");
  };

  return (
    <CenteredPageWrapper>
      <h2 className="text-xl font-semibold mb-4 text-center">Settings</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="w-5 h-5"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="w-5 h-5"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600 transition"
        >
          Save Settings
        </button>
      </div>
    </CenteredPageWrapper>
  );
};

export default SettingsPage;
