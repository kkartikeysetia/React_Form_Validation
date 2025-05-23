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
    <div className="min-h-screen bg-gradient-to-br w-full from-slate-100 via-slate-200 to-slate-200 py-8 px-8 flex justify-center items-start py-12 px-4 print-container">
      <div className="w-1/3 max-w-3xl bg-white rounded-2xl border border-gray-900 shadow-xl p-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Registration Successful!{" "}
            <span aria-label="checkmark" role="img">
              ✅
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Here are your submitted details:
          </p>
        </div>

        <div className="space-y-5 mb-12">
          {Object.entries(state).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center p-5
                bg-gray-50 rounded-lg border-l-6 border-blue-600
                hover:shadow-md transition-all duration-200 hover:translate-x-1 print-flex"
            >
              <div className="sm:w-1/3 mb-3 sm:mb-0 print-label">
                <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                  {getReadableLabel(key)}:
                </span>
              </div>
              <div className="sm:w-2/3 print-value">
                <span className="text-gray-900 font-medium text-base">
                  {maskValue(key, value)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700
              hover:from-gray-700 hover:to-gray-800 text-white font-semibold
              py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-green-400 shadow-lg"
          >
            ← Go Back to Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
