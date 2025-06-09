import SignUp from "./Pages/Authentication/SignUp";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  return (
    <BrowserRouter>
      <SignUp />;
    </BrowserRouter>
  );
};

export default Main;
