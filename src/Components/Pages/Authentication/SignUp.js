import { useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import { handleSignUp } from "../../Store/Slices/AuthSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUpHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);

      if (!email.trim() || !password || !confirmPassword) {
        setError("All fields are required.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading(true);
      const resultAction = await dispatch(
        handleSignUp({ email: email.trim(), password })
      );
      setLoading(false);

      if (handleSignUp.fulfilled.match(resultAction)) {
        navigate("/welcome");
      } else {
        setError(resultAction.payload || resultAction.error.message);
        console.error("Signup failed:", resultAction);
      }
    },
    [dispatch, email, password, confirmPassword, navigate]
  );

  return (
    <Card>
      <h2 className="py-3">Sign Up</h2>
      <Form className={classes.form} onSubmit={signUpHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="email">E-Mail ID:</label>
          </div>
          <div className="col-7">
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="E-Mail ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-7">
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <div className="col-7">
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </Form>

      <div className="text-center mb-3">
        <Link className={classes.link} to="/login">
          Already have an account? LOGIN
        </Link>
      </div>
    </Card>
  );
};

export default SignUp;
