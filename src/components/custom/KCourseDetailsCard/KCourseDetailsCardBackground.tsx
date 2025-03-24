import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from 'react-native-svg';

export const KCourseDetailsCardBackground = (props: SvgProps) => (
  <Svg height={92} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Ellipse
        cx={17.498}
        cy={5.706}
        fill="#009EA2"
        fillOpacity={0.6}
        rx={38.039}
        ry={35.659}
      />
      <Ellipse
        cx={17.498}
        cy={5.706}
        fill="#009EA2"
        fillOpacity={0.8}
        rx={30.431}
        ry={28.527}
      />
      <Ellipse cx={19.78} cy={5.706} fill="#009EA2" rx={22.823} ry={21.395} />
      <Ellipse
        cx={179.545}
        cy={41.364}
        fill="#EFB036"
        fillOpacity={0.6}
        rx={38.039}
        ry={35.659}
      />
      <Ellipse
        cx={179.545}
        cy={41.364}
        fill="#EFB036"
        fillOpacity={0.8}
        rx={30.431}
        ry={28.527}
      />
      <Ellipse
        cx={181.827}
        cy={41.364}
        fill="#EFB036"
        rx={22.823}
        ry={21.395}
      />
      <Ellipse
        cx={78.361}
        cy={92}
        fill="#9747FF"
        fillOpacity={0.6}
        rx={38.039}
        ry={35.659}
      />
      <Ellipse
        cx={78.361}
        cy={92}
        fill="#9747FF"
        fillOpacity={0.498}
        rx={30.431}
        ry={28.527}
      />
      <Ellipse cx={80.643} cy={92} fill="#9747FF" rx={22.823} ry={21.395} />
      <Path
        fill="url(#b)"
        d="M0 10C0 4.477 4.477 0 10 0h174c5.523 0 10 4.477 10 10v72c0 5.523-4.477 10-10 10H10C4.477 92 0 87.523 0 82V10Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={13.379}
        y1={4.992}
        y2={64.974}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#1A2C5B" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#1A2C5B" stopOpacity={0.6} />
      </LinearGradient>
      <ClipPath id="a">
        <Rect width={props?.width ?? 194} height={92} fill="#fff" rx={10} />
      </ClipPath>
    </Defs>
  </Svg>
);
