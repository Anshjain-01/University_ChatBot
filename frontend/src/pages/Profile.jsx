import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getCurrentUser,
  updateProfile,
} from "../services/authservice";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);

        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          studentId: data.user.studentId || "",
          department: data.user.department || "",
        });
      } catch (error) {
        console.error(
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const data = await updateProfile(formData);

      setUser(data.user);

      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        studentId: data.user.studentId || "",
        department: data.user.department || "",
      });

      setIsEditing(false);
    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      studentId: user?.studentId || "",
      department: user?.department || "",
    });

    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Profile
              </h1>

              <p className="mt-2 text-gray-500">
                View and manage your account information
              </p>
            </div>

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl font-semibold text-blue-600">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {user?.name || "Not available"}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {user?.email || "Not available"}
                </p>
              )}
            </div>

            {/* Roll Number */}
            <div>
              <p className="text-sm text-gray-500">
                Roll Number
              </p>

              {isEditing ? (
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {user?.studentId || "Not available"}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <p className="text-sm text-gray-500">
                Department
              </p>

              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {user?.department || "Not available"}
                </p>
              )}
            </div>

            {/* Account Type */}
            <div>
              <p className="text-sm text-gray-500">
                Account Type
              </p>

              <p className="mt-1 text-lg font-medium text-gray-900 capitalize">
                {user?.role || "Not available"}
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 pt-6 border-t">

            {isEditing ? (
              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}

          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;