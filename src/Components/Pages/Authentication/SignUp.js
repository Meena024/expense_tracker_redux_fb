import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { handleSignUp } from "../../Store/Slices/AuthSlice";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (password === confirmPasswordRef.current.value) {
      const resultAction = await dispatch(handleSignUp({ email, password }));

      if (handleSignUp.fulfilled.match(resultAction)) {
        navigate("/welcome");
      } else {
        console.error(
          "Signup failed:",
          resultAction.payload || resultAction.error.message
        );
      }
    } else {
      alert("password mismatch!");
    }
  };

  return (
    <Card>
      <h2 className="py-3">Sign Up</h2>
      <Form className={classes.form} onSubmit={signUpHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="email">E-Mail ID:</label>
          </div>
          <div className="col-9">
            <input
              id="email_id"
              type="email"
              className="form-control"
              placeholder="E-Mail id"
              ref={emailRef}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-9">
            <input
              id="pasword"
              type="password"
              className="form-control"
              placeholder="Password"
              ref={passwordRef}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <div className="col-9">
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </Form>
      <Link className={classes.link} to="/login">
        Already having an account? LOGIN
      </Link>
    </Card>
  );
};

export default SignUp;
