import { IconButton as MuiIconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const RemoveStyledIconBtn = styled(MuiIconButton)`
  background-color: aliceblue !important;
  border-radius: 0.5rem !important;
  padding: 1rem !important;
`;

const IconButton = (props) =>
  props?.removeicon ? <RemoveStyledIconBtn {...props} /> : <MuiIconButton {...props} />;

export default IconButton;
