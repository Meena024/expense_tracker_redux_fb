import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Main from "./Components/Main";
import { store } from "./Components/Store/store";
import { auth } from "./Components/Firebase/initialize";
import { authActions } from "./Components/Store/Slices/AuthSlice";

function AuthInitializer() {
  const dispatch = useDispatch();
  const { color, isPremium } = useSelector((state) => state.Expense);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent-color",
      isPremium ? color : "#720455"
    );
  }, [isPremium, color]);

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
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
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
