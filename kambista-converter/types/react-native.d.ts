import 'react-native';
import type { TextProps } from 'react-native';

declare module 'react-native' {
  export class Text extends React.Component<TextProps> {
    static defaultProps?: Partial<TextProps>;
  }
}
