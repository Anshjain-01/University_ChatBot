import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authservice.js";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
       <button
  onClick={() => navigate("/chat")}
  className="text-xl font-bold text-gray-900 hover:text-blue-600 transition"
>
  University AI Assistant
</button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;