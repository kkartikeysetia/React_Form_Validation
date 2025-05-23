import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Chicago", "San Francisco"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Germany: ["Berlin", "Munich", "Frankfurt"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
};

function FormPage() {
  const navigate = useNavigate();

  // Popup state
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
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
    setFormData((f) => ({ ...f, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
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
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
          error = "Invalid PAN (e.g., ABCDE1234F)";
        break;
      case "aadhar":
        if (!/^\d{12}$/.test(value)) error = "Aadhar must be 12 digits.";
        break;
      default:
        break;
    }
    setErrors((e) => ({ ...e, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // run validation for all fields
    let valid = true;
    const newErrors = {};
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
          if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
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
      // show the success popup
      setShowSuccess(true);
    }
  };

  // simple check: all fields non-empty and no errors
  const isFormValid =
    Object.values(formData).every((v) => v.trim()) &&
    Object.values(errors).every((e) => !e);

  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-slate-100 via-slate-200 to-slate-300 py-8 px-8 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 bg-white rounded-xl shadow-2xl border border-slate-900 p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
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
          <div key={name} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border-2 rounded-lg text-slate-900 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600
                ${
                  touched[name] && errors[name]
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300"
                }`}
            />
            {touched[name] && errors[name] && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors[name]}
              </p>
            )}
          </div>
        ))}

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 pr-12 border-2 rounded-lg text-gray-900
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500
                ${
                  touched.password && errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.password}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 uppercase mb-1">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border-2 rounded-lg text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500
              ${
                touched.country && errors.country
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
          >
            <option value="">-- Select Country --</option>
            {Object.keys(countryCityMap).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.country}
            </p>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
            City
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border-2 rounded-lg text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500
              ${
                touched.city && errors.city
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
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
              <span className="mr-1">⚠</span>
              {errors.city}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-bold text-black uppercase transition
    border-2
    ${
      isFormValid
        ? "bg-blue-700 border-blue-800 hover:bg-blue-800 hover:border-blue-900"
        : "bg-gray-400 border-gray-400 cursor-not-allowed"
    }`}
        >
          Submit Registration
        </button>
      </form>

      {/* Success Popup */}
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
