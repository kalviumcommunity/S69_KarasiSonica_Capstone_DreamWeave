// Profile.jsx
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/user/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!profile) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-500">Name:</label>
            <p className="text-lg font-medium text-gray-900">{profile.name}</p>
          </div>
          <div>
            <label className="text-gray-500">Username:</label>
            <p className="text-gray-800">@{profile.username}</p>
          </div>
          <div>
            <label className="text-gray-500">Email:</label>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div>
            <label className="text-gray-500">Bio:</label>
            <p className="text-gray-700">{profile.bio}</p>
          </div>
          <div>
            <label className="text-gray-500">Joined:</label>
            <p className="text-gray-700">
              {new Date(profile.joined).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
