import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="*"
          element={<div className="text-light">Page Not Found.</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
