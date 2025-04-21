import React from "react";
import { Path } from "react-native-svg";
import IconWrapper, { IconWrapperProps } from "./wrapper/IconWrapper";

const SquarePlusIcon: React.FC<IconWrapperProps> = (props) => {
  return (
    <IconWrapper viewBox="0 0 42 42" {...props}>
      <Path
        d="M35.8238 0H5.77628C2.59215 0 0 2.59109 0 5.77392V35.8091C0 38.9919 2.59215 41.583 5.77628 41.583H35.8238C39.0079 41.583 41.6 38.9919 41.6 35.8091V15.5914C41.6 15.0714 41.1785 14.65 40.6583 14.65C40.1381 14.65 39.7164 15.0714 39.7164 15.5914V35.818C39.7164 37.9608 37.9675 39.7092 35.8238 39.7092H5.77628C3.6326 39.7092 1.8836 37.9608 1.8836 35.818V5.78289C1.8836 3.64008 3.6326 1.89177 5.77628 1.89177H35.8238C37.9675 1.89177 39.7164 3.64008 39.7164 5.78289V7.35189C39.7164 7.8719 40.1381 8.29329 40.6583 8.29329C41.1785 8.29329 41.6 7.8719 41.6 7.35189V5.78289C41.6 2.59109 39.0079 0 35.8238 0Z"
        fill={props.color || "currentColor"}
      />
      <Path
        d="M20.6267 15.2612V25.9746"
        stroke={props.color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.2681 20.6182H25.9858"
        stroke={props.color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M40.8088 9.70264C40.2885 9.70264 39.8669 10.124 39.8669 10.644V12.3386C39.8669 12.8586 40.2885 13.28 40.8088 13.28C41.329 13.28 41.7505 12.8586 41.7505 12.3386V10.644C41.7505 10.124 41.329 9.70264 40.8088 9.70264Z"
        fill={props.color || "currentColor"}
      />
    </IconWrapper>
  );
};

export default SquarePlusIcon;
