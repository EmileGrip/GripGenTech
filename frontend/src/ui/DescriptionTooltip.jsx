import { Tooltip } from "@mui/material";
import { styled } from "@mui/system";

const DescriptionTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
    color: #788894;
    background-color: #E5F3FC;
    font-size: 12px;
    border-radius: 7px;
    padding: 8px 10px;
`);

export default DescriptionTooltip;
