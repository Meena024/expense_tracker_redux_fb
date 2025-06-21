import { useEffect } from "react";
import Card from "../../UI/Card";
import UpdateProfile from "./UpdateProfile";
import { useNavigate } from "react-router";
import { handlerLogout, authActions } from "../../Store/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToggleProfileForm } from "../../Store/Slices/ProfileSlice";
import { auth } from "../../Firebase/initialize";

const Welcome = () => {
  const dispatch = useDispatch();
  const toggleProfileForm = useSelector(
    (state) => state.Profile.toggleProfileForm
  );
  const navigate = useNavigate();
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
          })
        );
      });
    }
  }, [dispatch]);

  const logoutHandler = async () => {
    await dispatch(handlerLogout());
    await dispatch(authActions.setUser(null));
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
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </Card>
  );
};

export default Welcome;
