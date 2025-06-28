import Main from "./Components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./Components/Store/store";
import { BrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/Firebase/initialize";
import { authActions } from "./Components/Store/Slices/AuthSlice";
import { useEffect } from "react";

function AuthInitializer() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.Expense.color);
  const premium = useSelector((state) => state.Expense.isPremium);

  useEffect(() => {
    console.log(color);
    document.documentElement.style.setProperty(
      "--accent-color",
      premium ? color : "#720455"
    );
  }, [premium, color]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        dispatch(authActions.setUser(null));
        // dispatch(authActions.setIsLoggedIn(false));
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return null; // No UI, just logic
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthInitializer />
        <h1 className="m-5 text-light">Welcome to EXPENSE TRACKER!</h1>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
