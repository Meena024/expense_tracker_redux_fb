import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/initialize";
import { authActions } from "./Store/Slices/AuthSlice";

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

export default AuthInitializer;
