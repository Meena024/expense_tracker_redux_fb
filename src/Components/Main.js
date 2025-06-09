import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  return (
    <BrowserRouter>
      <SignUp />
      <Login />
    </BrowserRouter>
  );
};

export default Main;
