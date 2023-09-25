import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import axiosInstance from "../../../helper/axiosInstance";
import CustomModal from "../../../ui/CustomModal";
import InfoModal from "../../admin/organigram/InfoModal";

const Node = ({ data, isConnectable }) => {
  const name = data.user
    ? `${data.user?.first_name} ${data.user?.last_name}`
    : "Empty Name";
  const title = data.title ? data?.title : "empty role";
  const department = data.department ? data?.department : "empty department";
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleInfoOpen = () => setIsInfoOpen(true);
  const handleInfoClose = () => setIsInfoOpen(false);

  return (
    <>
      <CustomModal open={isInfoOpen} onClose={handleInfoClose} title=" ">
        <InfoModal
          data={data}
          closeModal={handleInfoClose}
          hideOptions={true}
        />
      </CustomModal>
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
          src={data?.user?.profile_picture}
          alt={
            data?.user?.profile_picture
              ? "Profile picture"
              : "Empty role picture"
          }
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
          <IconButton
            onClick={handleInfoOpen}
            title={name}
            sx={{ borderRadius: 0 }}
          >
            <Typography
              variant="h4"
              fontWeight="700"
              color="primary"
              sx={{
                textAlign: "center",
                mb: 0.5,
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                px: 1,
              }}
            >
              {name}
            </Typography>
          </IconButton>

          <div title={title}>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontWeight: "400",
                opacity: "0.7",
                textAlign: "center",
                mb: 0.5,
                textTransform: "capitalize",
                overflow: "hidden",
                textOverflow: "ellipsis",
                px: 1,
              }}
            >
              {title}
            </Typography>
          </div>

          <div title={department}>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontWeight: "400",
                opacity: "0.7",
                textAlign: "center",
                mb: 0.5,
                textTransform: "capitalize",
                overflow: "hidden",
                textOverflow: "ellipsis",
                px: 1,
              }}
            >
              {department}
            </Typography>
          </div>
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
