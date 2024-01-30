import { Outlet, useOutletContext } from "react-router-dom";
import useLocationChange from "../../hooks/useLocationChange";

const SettingsPage = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);
  return <Outlet />;
};

export default SettingsPage;
