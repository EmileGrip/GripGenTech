import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import person_icon from "../../../assets/person_icon.svg";
import group_icon from "../../../assets/group_icon.svg";
import hide_icon from "../../../assets/hide_icon.svg";
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

        <Stack
          className="data__bar"
          sx={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            background: "#D9D9D9",
            borderRadius: "0px 0px 4px 4px",
            py: 0.5,
            width: "145px",
          }}
        >
          <Box sx={{ lineHeight: "12px" }}>
            <img src={person_icon} alt="icon" />
            <Typography variant="span" ml={0.5}>
              {data.person}
            </Typography>
          </Box>
          <Box sx={{ lineHeight: "12px" }}>
            <img src={group_icon} alt="icon" />
            <Typography variant="span" ml={0.5}>
              {data.group}
            </Typography>
          </Box>
          <Box>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <img src={hide_icon} alt="icon" />
            </button>
          </Box>
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
