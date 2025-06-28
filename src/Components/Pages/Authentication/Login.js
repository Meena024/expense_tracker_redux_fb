import { useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import { handleLogin } from "../../Store/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);

      if (!email.trim() || !password) {
        setError("Please enter both email and password.");
        return;
      }

      setLoading(true);
      const resultAction = await dispatch(handleLogin({ email, password }));
      setLoading(false);

      if (handleLogin.fulfilled.match(resultAction)) {
        navigate("/welcome");
      } else {
        setError(resultAction.payload || resultAction.error?.message);
        console.error("Login failed:", resultAction);
      }
    },
    [dispatch, email, password, navigate]
  );

  return (
    <Card className="my-5">
      <h2 className="py-3">Login</h2>
      <Form className={classes.form} onSubmit={loginHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="email">E-Mail ID:</label>
          </div>
          <div className="col-7">
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="E-Mail id"
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
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </Form>

      <div className="text-center mt-3">
        <Link className={classes.link} to="/signup">
          Create a new account? SIGN UP
        </Link>
      </div>
    </Card>
  );
};

export default Login;
