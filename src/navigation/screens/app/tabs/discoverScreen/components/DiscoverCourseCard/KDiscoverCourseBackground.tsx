import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from 'react-native-svg';

export const KDiscoverCourseBackground = (
  props: SvgProps & { firstColor: string; secondColor?: string }
) => (
  <Svg
    width={props?.width ?? 200}
    height={props?.height ?? 130}
    viewBox={`0 0 ${props?.width ?? 200} ${props?.height ?? 130}`}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d={`M0 10C0 4.477 4.477 0 10 0h${props?.width ?? 200 - 20}c5.523 0 10 4.477 10 10v${props?.height ?? 130 - 20}c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10V10Z`}
      />
      <Circle
        cx={12}
        cy={136}
        r={50}
        fill={props?.secondColor ? props?.secondColor : '#9747FF'}
        fillOpacity={props?.secondColor ? 0.6 : 0}
        transform="rotate(-180 12 136)"
      />
      <Circle
        cx={12}
        cy={136}
        r={40}
        fill={props?.secondColor ? props?.secondColor : '#9747FF'}
        fillOpacity={props?.secondColor ? 0.8 : 0}
        transform="rotate(-180 12 136)"
      />
      <Circle
        cx={9}
        cy={136}
        r={30}
        fill={props?.secondColor ? props?.secondColor : '#9747FF'}
        fillOpacity={props?.secondColor ? 1 : 0}
        transform="rotate(-180 9 136)"
      />
      <Circle
        cx={182}
        cy={111}
        r={50}
        fill={props?.firstColor}
        fillOpacity={0.6}
      />
      <Circle
        cx={182}
        cy={111}
        r={40}
        fill={props?.firstColor}
        fillOpacity={0.8}
      />
      <Circle cx={185} cy={111} r={30} fill={props?.firstColor} />
      <Path
        fill="url(#c)"
        d="M0 10C0 4.477 4.477 0 10 0h180c5.523 0 10 4.477 10 10v110c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10V10Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={18.5}
        x2={190.5}
        y1={11.5}
        y2={114.5}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#1A2C5B" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#1A2C5B" stopOpacity={0.6} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={18.5}
        x2={190.5}
        y1={11.5}
        y2={114.5}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#1A2C5B" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#1A2C5B" stopOpacity={0.6} />
      </LinearGradient>
      <ClipPath id="a">
        <Rect
          width={props?.width ?? 200}
          height={props?.height ?? 130}
          fill="#fff"
          rx={10}
        />
      </ClipPath>
    </Defs>
  </Svg>
);
