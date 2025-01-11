import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const DiscoverIcon = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      strokeWidth={1.5}
      d="m8.829 17.172 1.989-6.354 6.354-1.99-1.99 6.354-6.353 1.99Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      strokeWidth={1.5}
      d="M13 25c6.627 0 12-5.373 12-12S19.627 1 13 1 1 6.373 1 13s5.373 12 12 12Z"
    />
  </Svg>
);
