import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import person_icon from "../../../assets/person_icon.svg";
import group_icon from "../../../assets/group_icon.svg";
import hide_icon from "../../../assets/hide_icon.svg";
import { Handle, Position } from "reactflow";
import addIcon from "../../../assets/addIcon.svg";
import emptyRoleIcon from "../../../assets/emptyRole_icon.png";
import CustomModal from "../../../ui/CustomModal";
import AddRoleForm from "./AddRoleForm";
import { useState } from "react";
import { suggestedJobs as ModalSuggestedJobs } from "../../../data/chartTreeData";
import { employees as ModalEmployees } from "../../../data/chartTreeData";
import AssignRoleForm from "./AssignRoleForm";
import { employeeData as dialogData } from "../../../data/chartTreeData";
import InfoModal from "./InfoModal";

const Node = ({ data, isConnectable }) => {
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleAddRoleOpen = () => setIsAddRoleOpen(true);
  const handleAddRoleClose = () => setIsAddRoleOpen(false);

  const handleAssignRoleOpen = () => setIsAssignRoleOpen(true);
  const handleAssignRoleClose = () => setIsAssignRoleOpen(false);

  const handleInfoOpen = () => setIsInfoOpen(true);
  const handleInfoClose = () => setIsInfoOpen(false);

  return (
    <>
      <CustomModal
        open={isAddRoleOpen}
        onClose={handleAddRoleClose}
        title="Add Role"
      >
        <AddRoleForm data={ModalSuggestedJobs} />
      </CustomModal>
      <CustomModal
        open={isAssignRoleOpen}
        onClose={handleAssignRoleClose}
        title="Assign Role"
      >
        <AssignRoleForm data={{}} employees={ModalEmployees} />
      </CustomModal>
      <CustomModal open={isInfoOpen} onClose={handleInfoClose} title=" ">
        <InfoModal data={dialogData} />
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
        <Button
          onClick={handleAssignRoleOpen}
          sx={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "100px",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              background: "#D9D9D9",
              p: "23px",
            }}
            src={emptyRoleIcon}
            alt={"icon"}
          />
        </Button>

        <Box>
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
            <IconButton onClick={handleInfoOpen} sx={{ borderRadius: 0 }}>
              <Typography
                variant="h4"
                fontSize="18px"
                fontWeight="700"
                color="primary"
                sx={{
                  textAlign: "center",
                  mb: 0.5,
                  textTransform: "capitalize",
                }}
              >
                empty role
              </Typography>
            </IconButton>
            <IconButton sx={{ borderRadius: 0 }}>
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: "400",
                  opacity: "0.7",
                  textAlign: "center",
                  mb: 0.5,
                }}
              >
                Click to add
              </Typography>
            </IconButton>
          </Stack>
          {data.id === "node-1" ? (
            <>
              <IconButton
                onClick={handleAddRoleOpen}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "-42px",
                }}
              >
                <img src={addIcon} alt="add role" />
              </IconButton>
              <IconButton
                onClick={handleAddRoleOpen}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-42px",
                }}
              >
                <img src={addIcon} alt="add role" />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={handleAddRoleOpen}
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "-42px",
              }}
            >
              <img src={addIcon} alt="add role" />
            </IconButton>
          )}
        </Box>
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
