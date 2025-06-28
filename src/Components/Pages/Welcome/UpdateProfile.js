import { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getAuth } from "firebase/auth";
import { Form } from "react-bootstrap";

import Card from "../../UI/Card";
import classes from "../Authentication/SignUp.module.css";
import { setToggleProfileForm } from "../../Store/Slices/ProfileSlice";
import { authActions } from "../../Store/Slices/AuthSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const nameRef = useRef(null);
  const imgURLRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfileHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      const name = nameRef.current?.value.trim();
      const photoURL = imgURLRef.current?.value.trim();

      if (!name) {
        setError("Name is required.");
        setLoading(false);
        return;
      }

      try {
        const currentUser = getAuth().currentUser;

        if (!currentUser) throw new Error("No user is currently logged in");

        await updateProfile(currentUser, {
          displayName: name,
          photoURL,
        });

        dispatch(
          authActions.setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          })
        );

        dispatch(setToggleProfileForm());
      } catch (err) {
        console.error("Profile update error:", err);
        setError("Failed to update profile. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const cancelHandler = () => dispatch(setToggleProfileForm());

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

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div className="d-flex justify-content-center m-3">
          <button type="submit" className="m-2" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <button className="m-2" type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateProfile;
