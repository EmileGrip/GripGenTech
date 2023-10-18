import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLocationChange = (action) => {
  const location = useLocation();

  useEffect(() => {
    action(location.pathname.split("/").at(-2));
  }, [location, action]);
};

export default useLocationChange;
