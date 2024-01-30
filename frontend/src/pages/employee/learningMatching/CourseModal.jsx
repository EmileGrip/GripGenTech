import { Backdrop, Box, Modal, Stack, styled } from "@mui/material";
import React, { Children, cloneElement } from "react";
import CloseIcon from "@mui/icons-material/Close";

const StyledWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  inset: "0",
  width: "318px",
  height: "338px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "8px 8px 40px 16px",
  border: "1px solid transparent",
  borderRadius: "10px",
  backgroundColor: " #FFF",
  boxShadow: "0px 20px 80px 0px rgba(0, 0, 0, 0.20)",
  [theme.breakpoints.up("md")]: {
    width: "507px",
    height: "35vh",
    maxHeight: "275px",
    padding: "8px 8px 40px 40px",
  },
}));

const StyledSkillsWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  inset: "0",
  width: "318px",
  height: "338px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "8px 8px 40px 16px",
  border: "1px solid transparent",
  borderRadius: "10px",
  backgroundColor: " #FFF",
  boxShadow: "0px 20px 80px 0px rgba(0, 0, 0, 0.20)",
  [theme.breakpoints.up("md")]: {
    width: "583px",
    height: "60vh",
    maxHeight: "560px",
    padding: "8px 8px 40px 40px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "70vh",
    maxHeight: "600px",
  },
}));

const StyledContentWrapper = styled(Stack)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "40px",
  paddingRight: "8px",
  paddingBottom: "4px",
  maxHeight: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  [theme.breakpoints.up("md")]: {
    paddingRight: "15px",
  },
}));

export const SkillsModal = ({ open, onClose, children }) => {
  if (!open) return null;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(child, { onClose });
    }
    return null;
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <StyledSkillsWrapper className="styled__SkillsWrapper">
        <CloseIcon
          sx={{
            alignSelf: "flex-end",
            color: "secondary.main",
            cursor: "pointer",
            width: "32px",
            height: "32px",
          }}
          onClick={onClose}
        />
        <StyledContentWrapper sx={{ pr: { md: "32px" } }}>
          {childrenWithProps}
        </StyledContentWrapper>
      </StyledSkillsWrapper>
    </Modal>
  );
};

const CourseModal = ({ open, onClose, onOpenSkillsModal, children }) => {
  console.log("children", children);
  if (!open) return null;

  console.log("React Children", React.Children);
  // Clone the children and pass open and onClose as props
  const childrenWithProps = React.Children.map(children, (child) => {
    console.log("child", child);
    if (child) {
      return React.cloneElement(child, { onOpenSkillsModal, onClose });
    }
    return null;
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <StyledWrapper className="styled__wrapper">
        <CloseIcon
          sx={{
            alignSelf: "flex-end",
            color: "secondary.main",
            cursor: "pointer",
            width: "32px",
            height: "32px",
          }}
          onClick={onClose}
        />
        <StyledContentWrapper>{childrenWithProps}</StyledContentWrapper>
      </StyledWrapper>
    </Modal>
  );
};

export default CourseModal;
