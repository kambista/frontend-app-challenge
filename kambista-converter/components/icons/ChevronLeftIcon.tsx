import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg width={12} height={21} fill="none" {...props}>
    <Path
      stroke="#060F26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m10 2.5-8 8 8 8"
    />
  </Svg>
);
