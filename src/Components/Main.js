import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "./Store/Slices/AuthSliceThunk";
import { authActions } from "./Store/Slices/AuthSlice";
import { setColor } from "./Store/Slices/ExpenseSlice";

import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import Welcome from "./Pages/Welcome/Welcome";
import AddExpense from "./Pages/Expenses/AddExpense";
import MyExpense from "./Pages/Expenses/MyExpenses";
import Header from "./Header";

import classes from "./Styles.module.css";
import AutoLogoutWrapper from "./Pages/AutoLogOut/AutoLogOutWrapper";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);

  const logoutHandler = async () => {
    try {
      await dispatch(handleLogout());
      dispatch(authActions.setUser(null));
      dispatch(setColor("#720455"));
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AutoLogoutWrapper>
      {/* <div> */}
      {user && (
        <div className={classes.button}>
          <button onClick={logoutHandler}>Logout</button>
          <Header />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="/myExpense" element={<MyExpense />} />
        <Route
          path="*"
          element={<div className="text-light">Page Not Found.</div>}
        />
      </Routes>
    </AutoLogoutWrapper>
    // </div>
  );
};

export default Main;
