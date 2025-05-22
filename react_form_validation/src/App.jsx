import { Routes, Route } from "react-router-dom";
import FormPage from "./components/FormPage";
import DisplayPage from "./components/DisplayPage";
import "./App.css"; // Component-specific styles

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/display" element={<DisplayPage />} />
    </Routes>
  );
}

export default App;
