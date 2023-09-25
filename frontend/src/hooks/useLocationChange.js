import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_SKILL_PROFILE, ROLES_REQUIRED_ROUTE } from "../routes/paths";

const useLocationChange = (action) => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes(ROLES_REQUIRED_ROUTE) ||
      location.pathname.includes(ADMIN_SKILL_PROFILE)
    ) {
      action(location.pathname.split("/").at(-1));
    } else {
      action(location.pathname.split("/").at(-2));
    }
  }, [location, action]);
};

export default useLocationChange;
