import React from "react";
import { Path } from "react-native-svg";
import IconWrapper, { IconWrapperProps } from "./wrapper/IconWrapper";

const ArrowLeftIcon: React.FC<IconWrapperProps> = (props) => {
  return (
    <IconWrapper viewBox="0 0 24 25" {...props}>
      <Path
        d="M16 4.5L8 12.5L16 20.5"
        stroke={props.color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={"none"}
      />
    </IconWrapper>
  );
};

export default ArrowLeftIcon;
