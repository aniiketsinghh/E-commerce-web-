import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const Profile = () => {
  const { userData } = useContext(AppContext);

  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
        No user data available. Please login.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="space-y-2">
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-600">{userData.name}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{userData.email}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-700">User ID:</span>
          <span className="text-gray-600">{userData._id || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
