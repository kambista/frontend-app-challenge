import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronBottomIcon = (
  props: SvgProps & { currentColor?: string },
) => {
  const { currentColor = '#686868', ...restProps } = props;

  return (
    <Svg width={14} height={8} fill="none" {...restProps}>
      <Path
        stroke={currentColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 6 6 6-6"
      />
    </Svg>
  );
};
