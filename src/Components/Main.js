import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import { BrowserRouter } from "react-router-dom";
import Welcome from "./Pages/Welcome";

const Main = () => {
  return (
    <BrowserRouter>
      <SignUp />
      <Login />
      <Welcome />
    </BrowserRouter>
  );
};

export default Main;
