Welcome to this **React Registration Form** project! A sleek and user-friendly form with real-time validation, dynamic country-city selection, and a polished UI — perfect for learning form handling or integrating into your React apps. The form includes client-side validation for fields such as name, email, password, phone number, and more.

## 🚀 Live Demo

Check it out live here:
🔗 [https://react-form-validation-kartikey.vercel.app/](https://react-form-validation-kartikey.vercel.app/)

## ✨ Features

* ✅ **Real-time validation** with instant feedback
* 🌍 Dynamic **Country & City** dropdown linked for easy selection
* 🔒 Password visibility toggle (Show/Hide)
* 🛡️ Validations for PAN, Aadhar, email, phone, and more
* 🎨 Clean, professional design with responsive layout
* 🎉 Success popup on form submission

## 🛠️ Tech Stack

* React (Functional Components + Hooks)
* React Router (for navigation after submission)
* Tailwind CSS (for styling)
* JavaScript (For form validation logic)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-form-validation.git
   ```
2. Navigate to the project directory:
   ```bash
   cd react-form-validation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
react_form_validation/
├── src/
│   ├── components/
│   │   ├── FormPage.jsx       # Main form component
│   │   ├── DisplayPage.jsx    # Page to display submitted data
│   ├── App.jsx                # Main application entry point
│   ├── App.css                # Global styles
│   ├── index.js               # React entry point
├── package.json               # Project dependencies and scripts
```

## How to Use

1. **Fill Out the Form**: Enter your details in the form fields. Fields include:
   - First Name
   - Last Name
   - Username
   - Email
   - Password
   - Phone Number
   - Country and City
   - PAN and Aadhar numbers
2. **Validation**: The form validates input as you type and displays error messages for invalid fields.
3. **Submit**: Once all fields are valid, the "Submit Registration" button becomes active.
4. **Success Popup**: Upon submission, a success popup is displayed, and you are redirected to the display page.

## Validation Rules

- **First Name/Last Name**: Required.
- **Username**: Required.
- **Email**: Must be a valid email format.
- **Password**: Minimum 6 characters.
- **Phone Number**: Must follow the format `+<country code><number>`.
- **PAN**: Must follow the format `ABCDE1234F`.
- **Aadhar**: Must be a 12-digit number.

### Success Popup
![Success Popup](https://via.placeholder.com/800x400?text=Success+Popup)

## ❤️ Thanks for checking it out!

If you liked this project, give it a ⭐ and share with your friends!

## 🙌 Contributions

Feel free to fork and improve! Suggestions, bug fixes, or UI enhancements are welcome.

---
