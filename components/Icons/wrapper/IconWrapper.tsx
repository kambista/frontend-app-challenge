import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { SvgProps } from "react-native-svg";

export interface IconBaseProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
  fill?: string;
}

export type IconWrapperProps = SvgProps &
  IconBaseProps & {
    children?: React.ReactNode;
  };

const IconWrapper: React.FC<IconWrapperProps> = ({
  size,
  width,
  height,
  color,
  children,
  style,
  fill,
  ...svgProps
}) => {
  const iconWidth = size || width || 20;
  const iconHeight = size || height || 20;

  return (
    <View style={style}>
      <Svg
        width={iconWidth}
        height={iconHeight}
        fill={fill || "none"}
        color={color}
        {...svgProps}
      >
        {children}
      </Svg>
    </View>
  );
};

export default IconWrapper;
