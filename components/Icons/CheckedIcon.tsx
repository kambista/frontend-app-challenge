import React from "react";
import IconWrapper, { IconBaseProps } from "./wrapper/IconWrapper";
import { Path } from "react-native-svg";

const CheckedIcon: React.FC<IconBaseProps> = (props) => {
  return (
    <IconWrapper viewBox="0 0 16 16" {...props}>
      <Path
        d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z"
        fill={props.color || "currentColor"}
      />
      <Path
        d="M6.33333 11.6667L3 8.33333L4.16667 7.16667L6.33333 9.33333L11.8333 3.83333L13 5L6.33333 11.6667Z"
        fill="white"
      />
    </IconWrapper>
  );
};

export default CheckedIcon;
