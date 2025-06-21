import { useRef } from "react";
import Card from "../../UI/Card";
import classes from "../Authentication/SignUp.module.css";
import { Form } from "react-bootstrap";
import { updateProfile, getAuth } from "firebase/auth";
import { setToggleProfileForm } from "../../Store/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Slices/AuthSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const nameRef = useRef(null);
  const imgURLRef = useRef(null);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const photoURL = imgURLRef.current.value;

    const updateProfil = async () => {
      try {
        await updateProfile(getAuth().currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
        console.log("Profile updated!");
      } catch (err) {
        console.log("Profile update error:", err.message);
      }
    };
    await updateProfil();
    const user = getAuth().currentUser;
    const cur_user = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    dispatch(authActions.setUser(cur_user));
    dispatch(setToggleProfileForm());
  };
  return (
    <Card className="my-5">
      <h2 className="py-3">My Profile</h2>
      <Form className={classes.form} onSubmit={updateProfileHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="name">Name:</label>
          </div>
          <div className="col-9">
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Your Name"
              ref={nameRef}
              autoComplete="name"
              defaultValue={user?.displayName || ""}
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="image">Image URL:</label>
          </div>
          <div className="col-9">
            <input
              id="image"
              type="url"
              className="form-control"
              placeholder="URL here"
              ref={imgURLRef}
              autoComplete="url"
              defaultValue={user?.photoURL || ""}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center m-3">
          <button type="submit" className="m-2">
            Update Profile
          </button>
          <button
            className="m-2"
            type="button"
            onClick={() => dispatch(setToggleProfileForm())}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateProfile;
