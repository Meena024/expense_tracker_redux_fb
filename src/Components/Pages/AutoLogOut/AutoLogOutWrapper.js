import { useState } from "react";
import useAutoLogout from "./useAutoLogOut";
import { handleLogout } from "../../Store/Slices/AuthSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Slices/AuthSlice";
import { setColor } from "../../Store/Slices/ExpenseSlice";
import { useNavigate } from "react-router";

const AutoLogoutWrapper = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoggingOut = async () => {
    try {
      await dispatch(handleLogout());
      dispatch(authActions.setUser(null));
      localStorage.removeItem("uid");
      dispatch(setColor("#720455"));
      navigate("/login");
      setShowWarning(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleWarning = () => {
    if (user) setShowWarning(true);
  };

  const handleStayLoggedIn = () => {
    setShowWarning(false);
  };

  useAutoLogout(handleWarning, handleLoggingOut, !!user);

  return (
    <>
      {children}
      <Modal show={showWarning} onHide={handleStayLoggedIn} centered>
        <Modal.Header>
          <Modal.Title>You're being logged out soon!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You’ve been inactive. You will be logged out in 15 seconds unless you
          click “Stay Logged In”.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleStayLoggedIn}>
            Stay Logged In
          </Button>
          <Button variant="danger" onClick={handleLoggingOut}>
            Logout Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AutoLogoutWrapper;
