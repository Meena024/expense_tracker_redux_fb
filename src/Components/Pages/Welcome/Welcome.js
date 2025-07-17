import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailVerification } from "firebase/auth";

import Card from "../../UI/Card";
import UpdateProfile from "./UpdateProfile";
import { authActions } from "../../Store/Slices/AuthSlice";
import { setToggleProfileForm } from "../../Store/Slices/ProfileSlice";
import { auth } from "../../Firebase/initialize";

const Welcome = () => {
  const dispatch = useDispatch();
  const { toggleProfileForm } = useSelector((state) => state.Profile);
  const { user } = useSelector((state) => state.Auth);

  useEffect(() => {
    const reloadUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        const updatedUser = auth.currentUser;
        dispatch(
          authActions.setUser({
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
            uid: updatedUser.uid,
            verifiedUser: updatedUser.emailVerified,
          })
        );
      }
    };
    reloadUser();
  }, [dispatch]);

  const verifyUserHandler = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (user && !user.verifiedUser && currentUser) {
      try {
        await sendEmailVerification(currentUser);
        alert("Verification email sent!");
      } catch (error) {
        console.error("Error sending verification email:", error);
        alert("Failed to send verification email.");
      }
    } else {
      alert("Email already verified or user not found.");
    }
  }, [user]);

  if (!user) {
    return (
      <Card className="text-light m-5">
        <p>Please login</p>
      </Card>
    );
  }

  return (
    <Card className="text-light m-5">
      <div>
        <p>
          {user.displayName ? `Hi ${user.displayName},` : "Hi!"} Welcome to
          Expense Tracker!
        </p>

        {user.photoURL && (
          <img
            src={user.photoURL}
            className="rounded mx-auto d-block m-2"
            alt="User"
            style={{ width: "70%", height: "70%", objectFit: "cover" }}
          />
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
          <button className="m-3" onClick={verifyUserHandler}>
            Verify Email
          </button>
        )}
      </div>
    </Card>
  );
};

export default Welcome;
