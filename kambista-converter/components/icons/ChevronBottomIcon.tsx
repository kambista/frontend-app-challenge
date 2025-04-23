import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronBottomIcon = (props: SvgProps) => (
  <Svg width={14} height={8} fill="none" {...props}>
    <Path
      stroke="#686868"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 6 6 6-6"
    />
  </Svg>
);
