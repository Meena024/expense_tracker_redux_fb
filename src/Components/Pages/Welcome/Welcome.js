import { useEffect } from "react";
import Card from "../../UI/Card";
import UpdateProfile from "./UpdateProfile";
import { authActions } from "../../Store/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToggleProfileForm } from "../../Store/Slices/ProfileSlice";
import { auth } from "../../Firebase/initialize";
import { sendEmailVerification } from "firebase/auth";

const Welcome = () => {
  const dispatch = useDispatch();
  const toggleProfileForm = useSelector(
    (state) => state.Profile.toggleProfileForm
  );
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      currentUser.reload().then(() => {
        dispatch(
          authActions.setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            verifiedUser: currentUser.emailVerified,
          })
        );
      });
    }
  }, [dispatch]);

  const verifyUserHandler = async () => {
    const cur_user = auth.currentUser;
    console.log(user, cur_user);
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(cur_user);
        alert("Verification email sent!");
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    } else {
      alert("Email already verified or user not found.");
    }
  };

  return (
    <Card className="text-light m-5">
      {user ? (
        <div>
          <p>
            {user.displayName ? `Hi ${user.displayName},` : "!"} Welcome to
            Expense Tracker!
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
          {!toggleProfileForm && (
            <button
              className="m-3"
              onClick={() => dispatch(setToggleProfileForm())}
            >
              Update Profile
            </button>
          )}
          {toggleProfileForm && <UpdateProfile />}
          {!user.verifiedUser && (
            <button className="m-3" onClick={() => verifyUserHandler()}>
              Verify User
            </button>
          )}
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </Card>
  );
};

export default Welcome;
