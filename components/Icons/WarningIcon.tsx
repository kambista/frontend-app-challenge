import React from "react";
import { Path } from "react-native-svg";
import IconWrapper, { IconWrapperProps } from "./wrapper/IconWrapper";

const WarningIcon: React.FC<IconWrapperProps> = (props) => {
  return (
    <IconWrapper viewBox="0 0 20 21" {...props}>
      <Path
        d="M10 18.8332C14.6024 18.8332 18.3334 15.1022 18.3334 10.4998C18.3334 5.89746 14.6024 2.1665 10 2.1665C5.39765 2.1665 1.66669 5.89746 1.66669 10.4998C1.66669 15.1022 5.39765 18.8332 10 18.8332Z"
        stroke={props.color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.268 8.876L10.568 14.348H8.792L9.08 8.876H10.268ZM9.68 6.02C9.96 6.02 10.188 6.112 10.364 6.296C10.54 6.472 10.628 6.692 10.628 6.956C10.628 7.204 10.54 7.42 10.364 7.604C10.188 7.78 9.96 7.868 9.68 7.868C9.4 7.868 9.168 7.78 8.984 7.604C8.8 7.42 8.708 7.204 8.708 6.956C8.708 6.692 8.8 6.472 8.984 6.296C9.168 6.112 9.4 6.02 9.68 6.02Z"
        fill={props.color || "currentColor"}
      />
    </IconWrapper>
  );
};

export default WarningIcon;
