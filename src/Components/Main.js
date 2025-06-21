import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/Slices/AuthSlice";
import AddExpense from "./Pages/Expenses/AddExpense";
import MyExpense from "./Pages/Expenses/MyExpenses";
import Header from "./Header";
import { handlerLogout } from "./Store/Slices/AuthSlice";
import Card from "./UI/Card";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(
          authActions.setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(authActions.setUser({ payload: null }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const logoutHandler = async () => {
    await dispatch(handlerLogout());
    await dispatch(authActions.setUser(null));
    navigate("/login");
  };

  return (
    <Card>
      {true && (
        <div>
          <button
            onClick={logoutHandler}
            className="position-absolute top-0 end-0 m-5"
          >
            Logout
          </button>
          <Header />
        </div>
      )}
      <Routes>
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
    </Card>
  );
};

// Wrap Main in BrowserRouter at the top level, like in index.js
export default Main;
