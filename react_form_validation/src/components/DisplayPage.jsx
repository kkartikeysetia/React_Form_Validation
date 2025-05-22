import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DisplayPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const getReadableLabel = (key) => {
    const labels = {
      firstName: "First Name",
      lastName: "Last Name",
      username: "Username",
      email: "Email Address",
      password: "Password",
      phone: "Phone Number",
      country: "Country",
      city: "City",
      pan: "PAN Number",
      aadhar: "Aadhar Number",
    };
    return labels[key] || key;
  };

  const maskValue = (key, value) => {
    if (key === "password") {
      return "•".repeat(value.length);
    }
    if (key === "aadhar") {
      return `XXXX XXXX ${value.slice(-4)}`;
    }
    if (key === "pan") {
      return `${value.slice(0, 5)}XXXX${value.slice(-1)}`;
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 py-8 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Registration Successful! ✅
          </h2>
          <p className="text-gray-600">Here are your submitted details:</p>
        </div>

        <div className="space-y-4 mb-8">
          {Object.entries(state).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center p-4
                bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg
                border-l-4 border-blue-500 hover:shadow-md transition-all duration-200
                hover:translate-x-1"
            >
              <div className="sm:w-1/3 mb-2 sm:mb-0">
                <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                  {getReadableLabel(key)}:
                </span>
              </div>
              <div className="sm:w-2/3">
                <span className="text-gray-900 font-medium">
                  {maskValue(key, value)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-700
              hover:from-green-600 hover:to-green-800 text-white font-semibold
              py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg hover:shadow-xl
              uppercase tracking-wide"
          >
            ← Go Back to Form
          </button>

          <button
            onClick={() => window.print()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700
              hover:from-blue-600 hover:to-blue-800 text-white font-semibold
              py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl
              uppercase tracking-wide"
          >
            🖨️ Print Details
          </button>
        </div>

        <div className="text-center mt-8 opacity-75">
          <div className="inline-flex items-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
