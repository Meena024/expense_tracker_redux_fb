import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/Slices/AuthSlice";

const Main = () => {
  const dispatch = useDispatch();

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

    return () => unsubscribe(); // cleanup
  }, [dispatch]);

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
