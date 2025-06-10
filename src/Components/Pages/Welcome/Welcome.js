import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseApp from "../../Firebase/initialize";
import Card from "../../UI/Card";
import UpdateProfile from "./UpdateProfile";
import { useNavigate } from "react-router";

const Welcome = () => {
  const [user, setUser] = useState(null);
  const [toggleUpdateProfileForm, setToggleUpdateProfileForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(getAuth(firebaseApp), (cur_user) => {
      setUser(cur_user);
      console.log(cur_user);
    });
    return () => unsubscibe();
  }, []);

  const logoutHandler = async () => {
    await signOut(getAuth(firebaseApp));
    navigate("/login");
  };

  return (
    <Card className="text-light">
      {user ? (
        <div>
          <button
            onClick={logoutHandler}
            className="position-absolute top-0 end-0 m-5"
          >
            Logout
          </button>
          <p>
            {user.displayName ? `Hi ${user.displayName},` : "!"} Welcome to
            Expense Tracker!{" "}
          </p>

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
          {!toggleUpdateProfileForm && (
            <button
              className="m-3"
              onClick={() =>
                setToggleUpdateProfileForm(!toggleUpdateProfileForm)
              }
            >
              Update Profile
            </button>
          )}
          {toggleUpdateProfileForm && (
            <UpdateProfile setToggleUpdateProfileForm />
          )}
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </Card>
  );
};

export default Welcome;
