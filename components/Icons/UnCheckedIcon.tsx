import React from "react";
import IconWrapper, { IconBaseProps } from "./wrapper/IconWrapper";
import { Rect } from "react-native-svg";

const UnCheckedIcon: React.FC<IconBaseProps> = ({ color, ...props }) => {
  return (
    <IconWrapper viewBox="0 0 20 20" {...props}>
      <Rect
        x="2.5"
        y="2.5"
        width="15"
        height="15"
        rx="3.5"
        stroke={color || "currentColor"}
        fill="transparent"
      />
    </IconWrapper>
  );
};

export default UnCheckedIcon;
