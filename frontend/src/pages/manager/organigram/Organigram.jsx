import { useLocation, useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
import { useEffect } from "react";
import Node from "./Node";
import { treeData as data } from "../../../data/organigramData";
import Flow from "./Flow";
import { Box, Typography } from "@mui/material";

const Organigram = () => {
  const location = useLocation();
  const [title, setTitle] = useOutletContext();
  useEffect(() => {
    setTitle(location.pathname.split("/").at(-1));
  }, [setTitle, location]);

  return (
    <>
      <Box pb={3}>
        <Typography variant="body2" color="secondary.main">
          Discover the company's hierarchy through the organization chart and
          click on a colleague for more information.
        </Typography>
      </Box>
      <Flow />
    </>
  );
};

export default Organigram;
