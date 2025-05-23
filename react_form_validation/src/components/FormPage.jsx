import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Country-city mapping renamed to placeOptions
const placeOptions = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Chicago", "San Francisco"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Germany: ["Berlin", "Munich", "Frankfurt"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
};

// Centralized validation rules with human-style messages and regex
const validationRules = {
  firstName: {
    required: true,
    validator: (val) => val.trim() !== "",
    errorMsg: "First name dalna zaroori hai bhai!",
  },
  lastName: {
    required: true,
    validator: (val) => val.trim() !== "",
    errorMsg: "Last name bhi chahiye!",
  },
  nickName: {
    required: true,
    validator: (val) => val.trim() !== "",
    errorMsg: "Username toh de bhai!",
  },
  emailAddr: {
    required: true,
    validator: (val) => /^\S+@\S+\.\S+$/.test(val),
    errorMsg: "Email thoda sahi daal yaar!",
  },
  pass: {
    required: true,
    validator: (val) => val.length >= 6,
    errorMsg: "Password kam se kam 6 character ka hona chahiye.",
  },
  phoneNumber: {
    required: true,
    validator: (val) => /^\+\d{1,4}\d{7,10}$/.test(val),
    errorMsg: "Phone number +countrycode ke saath sahi format me do.",
  },
  selectedCountry: {
    required: true,
    validator: (val) => val !== "",
    errorMsg: "Country select kar le pehle.",
  },
  selectedCity: {
    required: true,
    validator: (val) => val !== "",
    errorMsg: "City bhi select karna padega.",
  },
  panCard: {
    required: true,
    validator: (val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val),
    errorMsg: "PAN format galat hai (ex: ABCDE1234F).",
  },
  aadharCard: {
    required: true,
    validator: (val) => /^\d{12}$/.test(val),
    errorMsg: "Aadhar number 12 digits ka hona chahiye.",
  },
};

function checkFieldValidity(fieldName, value) {
  const rule = validationRules[fieldName];
  if (!rule) return ""; // No error if no rule found
  if (rule.required && !rule.validator(value)) {
    return rule.errorMsg;
  }
  return "";
}

function RegistrationForm() {
  const goTo = useNavigate();

  // Popup dikhega ya nahi
  const [popupVisible, setPopupVisible] = useState(false);

  // User ki sari input yahan store hogi
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    emailAddr: "",
    pass: "",
    phoneNumber: "",
    selectedCountry: "",
    selectedCity: "",
    panCard: "",
    aadharCard: "",
  });

  // Validation errors store karne ke liye
  const [inputErrors, setInputErrors] = useState({});

  // Jis field pe focus chhoda hai uska pata rahe
  const [fieldsTouched, setFieldsTouched] = useState({});

  // Password show/hide toggle ke liye
  const [isPassVisible, setIsPassVisible] = useState(false);

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserInputs((prev) => ({ ...prev, [name]: value }));

    if (fieldsTouched[name]) {
      const errorMsg = checkFieldValidity(name, value);
      setInputErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }

    // Agar country change ho toh city clear kar do
    if (name === "selectedCountry") {
      setUserInputs((prev) => ({ ...prev, selectedCity: "" }));
      setInputErrors((prev) => ({
        ...prev,
        selectedCity: "City bhi select karna padega.",
      }));
      setFieldsTouched((prev) => ({ ...prev, selectedCity: false }));
    }
  }

  function onInputBlur(e) {
    const { name, value } = e.target;

    setFieldsTouched((prev) => ({ ...prev, [name]: true }));

    const errorMsg = checkFieldValidity(name, value);
    setInputErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  const isFormReady =
    Object.values(userInputs).every((val) => val.trim() !== "") &&
    Object.values(inputErrors).every((err) => err === "");

  function onSubmitForm(e) {
    e.preventDefault();

    let formValid = true;
    const newErrors = {};

    for (const [field, val] of Object.entries(userInputs)) {
      const err = checkFieldValidity(field, val);
      if (err) formValid = false;
      newErrors[field] = err;
    }

    setInputErrors(newErrors);

    if (formValid) {
      setPopupVisible(true);
    }
  }

  return (
    <div
      className="min-h-screen w-full py-8 px-8 flex justify-center items-start"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
      }}
    >
      <form
        onSubmit={onSubmitForm}
        className="w-1/3 bg-white rounded-xl shadow-2xl border border-gray-900 p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Registration Form
        </h2>

        {/* Input fields */}
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Username", name: "nickName" },
          { label: "Email", name: "emailAddr", type: "email" },
          {
            label: "Phone (+countrycode)",
            name: "phoneNumber",
            placeholder: "+91xxxxxxxxxx",
          },
          { label: "PAN No.", name: "panCard" },
          { label: "Aadhar No.", name: "aadharCard" },
        ].map(({ label, name, type = "text", placeholder }) => (
          <div key={name} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={userInputs[name]}
              onChange={onInputChange}
              onBlur={onInputBlur}
              className={`w-full px-4 py-2 border-2 rounded-lg text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-700
                ${
                  fieldsTouched[name] && inputErrors[name]
                    ? "border-[#e53e3e] bg-[#fff5f5]"
                    : "border-gray-300"
                }`}
            />
            {fieldsTouched[name] && inputErrors[name] && (
              <p className="text-[#e53e3e] text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {inputErrors[name]}
              </p>
            )}
          </div>
        ))}

        {/* Password field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
            Password
          </label>
          <div className="relative">
            <input
              name="pass"
              type={isPassVisible ? "text" : "password"}
              value={userInputs.pass}
              onChange={onInputChange}
              onBlur={onInputBlur}
              className={`w-full px-4 py-2 pr-12 border-2 rounded-lg text-gray-900
                focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-700
                ${
                  fieldsTouched.pass && inputErrors.pass
                    ? "border-[#e53e3e] bg-[#fff5f5]"
                    : "border-gray-300"
                }`}
            />
            <button
              type="button"
              onClick={() => setIsPassVisible((s) => !s)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-700"
            >
              {isPassVisible ? "Hide" : "Show"}
            </button>
          </div>
          {fieldsTouched.pass && inputErrors.pass && (
            <p className="text-[#e53e3e] text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {inputErrors.pass}
            </p>
          )}
        </div>

        {/* Country dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
            Country
          </label>
          <select
            name="selectedCountry"
            value={userInputs.selectedCountry}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className={`w-full px-4 py-2 border-2 rounded-lg text-gray-900
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-700
              ${
                fieldsTouched.selectedCountry && inputErrors.selectedCountry
                  ? "border-[#e53e3e] bg-[#fff5f5]"
                  : "border-gray-300"
              }`}
          >
            <option value="">-- Select Country --</option>
            {Object.keys(placeOptions).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {fieldsTouched.selectedCountry && inputErrors.selectedCountry && (
            <p className="text-[#e53e3e] text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {inputErrors.selectedCountry}
            </p>
          )}
        </div>

        {/* City dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
            City
          </label>
          <select
            name="selectedCity"
            value={userInputs.selectedCity}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className={`w-full px-4 py-2 border-2 rounded-lg text-gray-900
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-700
              ${
                fieldsTouched.selectedCity && inputErrors.selectedCity
                  ? "border-[#e53e3e] bg-[#fff5f5]"
                  : "border-gray-300"
              }`}
          >
            <option value="">-- Select City --</option>
            {(placeOptions[userInputs.selectedCountry] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {fieldsTouched.selectedCity && inputErrors.selectedCity && (
            <p className="text-[#e53e3e] text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {inputErrors.selectedCity}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isFormReady}
          className={`w-full py-3 rounded-lg font-bold text-white uppercase transition
            border-2
            ${
              isFormReady
                ? "bg-[#2c7a7b] border-[#2c7a7b] hover:bg-[#285e61] hover:border-[#285e61]"
                : "bg-gray-400 border-gray-400 cursor-not-allowed"
            }`}
        >
          Submit Registration
        </button>
      </form>

      {/* Success popup */}
      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-teal-700">
              🎉 Registration Successful!
            </h3>
            <button
              onClick={() => {
                setPopupVisible(false);
                goTo("/display", { state: userInputs });
              }}
              className="mt-2 px-6 py-2 bg-[#2c7a7b] text-white rounded-lg hover:bg-[#285e61] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
