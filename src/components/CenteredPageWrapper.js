import React from "react";

const CenteredPageWrapper = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      {children}
    </div>
  </div>
);

export default CenteredPageWrapper;
