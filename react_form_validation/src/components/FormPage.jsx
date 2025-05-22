import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
const [showSuccess, setShowSuccess] = useState(false);

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Chicago", "San Francisco"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
};

function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = "This field is required.";
        break;
      case "username":
        if (!value.trim()) error = "Username is required.";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email.";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters.";
        break;
      case "phone":
        if (!/^\+\d{1,4}\d{7,10}$/.test(value))
          error = "Use format +911234567890";
        break;
      case "country":
        if (!value) error = "Please select a country.";
        break;
      case "city":
        if (!value) error = "Please select a city.";
        break;
      case "pan":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          error = "Invalid PAN (e.g., ABCDE1234F)";
        break;
      case "aadhar":
        if (!/^\d{12}$/.test(value)) error = "Aadhar must be 12 digits.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    Object.values(formData).every((v) => v.trim());

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};
    setErrors(newErrors);
    if (valid) {
      -navigate("/display", { state: formData });
      +setShowSuccess(true);
    }

    Object.entries(formData).forEach(([name, value]) => {
      let error = "";

      switch (name) {
        case "firstName":
        case "lastName":
          if (!value.trim()) error = "This field is required.";
          break;
        case "username":
          if (!value.trim()) error = "Username is required.";
          break;
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email.";
          break;
        case "password":
          if (value.length < 6)
            error = "Password must be at least 6 characters.";
          break;
        case "phone":
          if (!/^\+\d{1,4}\d{7,10}$/.test(value))
            error = "Use format +911234567890";
          break;
        case "country":
          if (!value) error = "Please select a country.";
          break;
        case "city":
          if (!value) error = "Please select a city.";
          break;
        case "pan":
          if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
            error = "Invalid PAN (e.g., ABCDE1234F)";
          break;
        case "aadhar":
          if (!/^\d{12}$/.test(value)) error = "Aadhar must be 12 digits.";
          break;
        default:
          break;
      }

      if (error) valid = false;
      newErrors[name] = error;
    });

    setErrors(newErrors);

    if (valid) {
      navigate("/display", { state: formData });
    }
  };

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 py-8 px-4 flex justify-center items-start">
      <form
        className="max-w-md w-full max-h-[90vh] overflow-y-auto text-black bg-white rounded-xl shadow-2xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Registration Form
        </h2>

        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Username", name: "username" },
          { label: "Email", name: "email", type: "email" },
          {
            label: "Phone (+countrycode)",
            name: "phone",
            placeholder: "+91xxxxxxxxxx",
          },
          { label: "PAN No.", name: "pan" },
          { label: "Aadhar No.", name: "aadhar" },
        ].map(({ label, name, type = "text", placeholder }) => (
          <div key={name} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500
                transition duration-200 ${
                  touched[name] && errors[name]
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
            />
            {touched[name] && errors[name] && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-2">⚠</span>
                {errors[name]}
              </p>
            )}
          </div>
        ))}

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 pr-12 border-2 rounded-lg text-gray-900
                focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500
                transition duration-200 ${
                  touched.password && errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 px-2 py-1 rounded text-sm font-medium transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <span className="mr-2">⚠</span>
              {errors.password}
            </p>
          )}
        </div>

        {/* Country Select */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900
              focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500
              transition duration-200 ${
                touched.country && errors.country
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <option value="">-- Select Country --</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <span className="mr-2">⚠</span>
              {errors.country}
            </p>
          )}
        </div>

        {/* City Select */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
            City
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900
              focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500
              transition duration-200 ${
                touched.city && errors.city
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <option value="">-- Select City --</option>
            {(countryCityMap[formData.country] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {touched.city && errors.city && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <span className="mr-2">⚠</span>
              {errors.city}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`mt-4 w-full py-4 px-6 rounded-lg font-semibold bg-gray text-black uppercase tracking-wide
    transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4
    ${
      isFormValid
        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl focus:ring-blue-300"
        : "bg-gray-400 cursor-not-allowed shadow-none transform-none"
    }`}
        >
          Submit Registration
        </button>
      </form>
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Registration Successful!
            </h3>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/display", { state: formData });
              }}
              className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default FormPage;
