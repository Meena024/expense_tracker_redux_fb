import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { authActions, handleLogout } from "./Store/Slices/AuthSlice";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          authActions.setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          })
        );
      } else {
        dispatch(authActions.setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      await dispatch(handleLogout());
      dispatch(authActions.setUser(null));
      localStorage.removeItem("uid");
      dispatch(setColor("#720455"));
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      {user && (
        <div className={classes.button}>
          <button onClick={logoutHandler}>Logout</button>
          <Header />
        </div>
      )}

      <AutoLogoutWrapper>
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
    </div>
  );
};

export default Main;
