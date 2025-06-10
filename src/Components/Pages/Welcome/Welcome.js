import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseApp from "../../Firebase/initialize";
import Card from "../../UI/Card";
import UpdateProfile from "./UpdateProfile";

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
          <p>
            {user.displayName ? `${user.displayName},` : "hi!"} Welcome to
            Expense Tracker{" "}
          </p>
          <button onClick={logoutHandler}>Logout</button>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              className="rounded mx-auto d-block m-2"
              alt=""
              style={{ width: "70%", height: "70%", objectFit: "cover" }}
            />
          ) : (
            " "
          )}
          <UpdateProfile />
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </Card>
  );
};

export default Welcome;
