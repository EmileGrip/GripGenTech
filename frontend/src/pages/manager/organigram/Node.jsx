import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";

const Node = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Stack
        className="node "
        sx={{
          backgroundColor: "transparent",
          position: "relative",
          width: "212px",
        }}
      >
        {/* <Box sx={{ height: "50px" }}></Box> */}
        <Avatar
          sx={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "100px",
          }}
          src={data.img}
          alt="avatar image"
        />
        <Stack
          className="contentBox"
          sx={{
            alignItems: "stretch",
            backgroundColor: "#fafafa",
            border: "1.5px solid #EAEAEA",
            borderRadius: "8px",
            pt: "68px",
            pb: 2,
            mt: "50px",
          }}
        >
          <Typography
            variant="h4"
            fontSize="18px"
            fontWeight="700"
            color="primary"
            sx={{ textAlign: "center", mb: 0.5, textTransform: "capitalize" }}
          >
            {data.name}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: "400",
              opacity: "0.7",
              textAlign: "center",
              mb: 0.5,
              textTransform: "capitalize",
            }}
          >
            {data.jobTitle}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: "400",
              opacity: "0.7",
              textAlign: "center",
              mb: 0.5,
              textTransform: "capitalize",
            }}
          >
            {data.field}
          </Typography>
        </Stack>
      </Stack>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </>
  );
};

export default Node;
