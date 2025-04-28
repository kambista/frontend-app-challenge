import Svg, { SvgProps, Path } from 'react-native-svg';
export const AddSquareIcon = (props: SvgProps) => (
  <Svg width={42} height={42} fill="none" {...props}>
    <Path
      fill="#060F26"
      d="M35.824 0H5.776A5.783 5.783 0 0 0 0 5.774v30.035a5.783 5.783 0 0 0 5.776 5.774h30.048a5.783 5.783 0 0 0 5.776-5.774V15.591a.941.941 0 0 0-1.884 0v20.227a3.9 3.9 0 0 1-3.892 3.891H5.776a3.9 3.9 0 0 1-3.892-3.891V5.783a3.9 3.9 0 0 1 3.892-3.891h30.048a3.9 3.9 0 0 1 3.892 3.89v1.57a.942.942 0 0 0 1.884 0v-1.57A5.785 5.785 0 0 0 35.824 0Z"
    />
    <Path
      stroke="#060F26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.627 15.261v10.714M15.268 20.618h10.718"
    />
    <Path
      fill="#060F26"
      d="M40.809 9.703a.941.941 0 0 0-.942.941v1.695a.942.942 0 0 0 1.884 0v-1.695a.941.941 0 0 0-.942-.941Z"
    />
  </Svg>
);
