import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseApp from "../Firebase/initialize";
import Card from "../UI/Card";

const Welcome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(getAuth(firebaseApp), (cur_user) => {
      setUser(cur_user);
      console.log(cur_user);
    });
    return () => unsubscibe();
  }, []);

  const logoutHandler = async () => {
    await signOut(getAuth(firebaseApp));
  };

  return (
    <Card className="text-light">
      {user ? (
        <div>
          <p>Welcome to Expense Tracker, {user.email}</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </Card>
  );
};

export default Welcome;
