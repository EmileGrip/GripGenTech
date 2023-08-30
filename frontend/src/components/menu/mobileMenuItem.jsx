import React from "react";
import { MenuItem, Link } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const StyledLink = styled(Link)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  color: ${theme.palette.primary.main};
  text-transform: capitalize;
`
);

const MobileMenuItem = ({ children, href, ...props }) => (
  <MenuItem>
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  </MenuItem>
);

MobileMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default MobileMenuItem;
