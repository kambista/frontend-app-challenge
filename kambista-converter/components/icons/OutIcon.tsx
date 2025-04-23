import Svg, { Path, SvgProps } from 'react-native-svg';

export const OutIcon = (props: SvgProps) => (
  <Svg width={32} height={33} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 25.5H9a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2h4M20 21.5l5-5-5-5M25 16.5H13"
    />
  </Svg>
);
