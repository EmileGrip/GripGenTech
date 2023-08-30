import React from "react";
import { MenuItem, Link } from "@mui/material";
import { styled } from "@mui/system";

const StyledLink = styled(Link)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  color: ${theme.palette.primary.main};
  text-transform: capitalize;
`
);
const MenuItemMobile = ({ children, href, ...props }) => (
  <MenuItem>
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  </MenuItem>
);

export default MenuItemMobile;
