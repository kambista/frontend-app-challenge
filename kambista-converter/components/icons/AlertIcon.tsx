import Svg, { SvgProps, Path } from 'react-native-svg';
export const AlertIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Path
      stroke="#7B3F0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 18.833a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
    />
    <Path
      fill="#7B3F0A"
      d="m8.792 14.348.288-5.472h1.188l.3 5.472H8.792Zm.888-6.48a.967.967 0 0 1-.696-.264.887.887 0 0 1-.276-.648c0-.264.092-.484.276-.66a.944.944 0 0 1 .696-.276c.28 0 .508.092.684.276a.895.895 0 0 1 .264.66.907.907 0 0 1-.264.648.925.925 0 0 1-.684.264Z"
    />
  </Svg>
);
