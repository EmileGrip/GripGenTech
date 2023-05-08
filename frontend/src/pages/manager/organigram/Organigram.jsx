import { useLocation, useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
import { useEffect } from "react";
import Node from "./Node";
import { treeData as data } from "../../../data/organigramData";
import Flow from "./Flow";
const Organigram = () => {
  const location = useLocation();
  const [title, setTitle] = useOutletContext();
  useEffect(() => {
    setTitle(location.pathname.split("/").at(-1));
  }, [setTitle, location]);
  return (
    <>
      <Flow />
    </>
  );
};

export default Organigram;
