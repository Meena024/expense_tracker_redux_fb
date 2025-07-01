import { useEffect, useRef } from "react";

const AUTO_LOGOUT_TIME = 10 * 60 * 1000; // 10 minutes
const WARNING_TIME = 15 * 1000; // 15 seconds

const useAutoLogout = (onWarning, onLogout, isActive = true) => {
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);

  const resetTimers = () => {
    if (!isActive) return;

    clearTimeout(timeoutRef.current);
    clearTimeout(warningRef.current);

    timeoutRef.current = setTimeout(() => {
      onWarning();

      warningRef.current = setTimeout(() => {
        onLogout?.();
      }, WARNING_TIME);
    }, AUTO_LOGOUT_TIME - WARNING_TIME);
  };

  useEffect(() => {
    if (!isActive) return;

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];
    const handleActivity = () => resetTimers();

    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    resetTimers();

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(timeoutRef.current);
      clearTimeout(warningRef.current);
    };
  }, [isActive]);
};

export default useAutoLogout;
