import { StyleSheet } from 'react-native';
import { sizes } from './sizes';

export const fonts = StyleSheet.create({
  headingXL: {
    fontSize: sizes.s48,
  },
  headingL: {
    fontSize: sizes.s36,
  },
  heading: {
    fontSize: sizes.s32,
  },

  bodyXL: {
    fontSize: sizes.s24,
  },
  bodyL: {
    fontSize: sizes.s20,
  },
  bodyM: {
    fontSize: sizes.s18,
  },
  body: {
    fontSize: sizes.s16,
  },
  bodyS: {
    fontSize: sizes.s14,
  },
  bodyXS: {
    fontSize: sizes.s12,
  },

  black: {
    fontFamily: 'Raleway-Black',
  },
  extraBold: {
    fontFamily: 'Raleway-ExtraBold',
  },
  bold: {
    fontFamily: 'Raleway-Bold',
  },
  semiBold: {
    fontFamily: 'Raleway-SemiBold',
  },
  medium: {
    fontFamily: 'Raleway-Medium',
  },
  regular: {
    fontFamily: 'Raleway-Regular',
  },
  light: {
    fontFamily: 'Raleway-Light',
  },
  extraLight: {
    fontFamily: 'Raleway-ExtraLight',
  },
  thin: {
    fontFamily: 'Raleway-Thin',
  },
});

export interface FontsInterface {
  headingXL?: boolean;
  headingL?: boolean;
  heading?: boolean;

  bodyXL?: boolean;
  bodyL?: boolean;
  bodyM?: boolean;
  body?: boolean;
  bodyS?: boolean;
  bodyXS?: boolean;

  black?: boolean;
  extraBold?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  regular?: boolean;
  light?: boolean;
  extraLight?: boolean;
  thin?: boolean;
}

export const handleFonts = (props: FontsInterface) => [
  props.headingXL && fonts.headingXL,
  props.headingL && fonts.headingL,
  props.heading && fonts.heading,

  props.bodyXL && fonts.bodyXL,
  props.bodyL && fonts.bodyL,
  props.bodyM && fonts.bodyM,
  props.body && fonts.body,
  props.bodyS && fonts.bodyS,
  props.bodyXS && fonts.bodyXS,

  props.black && fonts.black,
  props.extraBold && fonts.extraBold,
  props.bold && fonts.bold,
  props.semiBold && fonts.semiBold,
  props.medium && fonts.medium,
  props.regular && fonts.regular,
  props.light && fonts.light,
  props.extraLight && fonts.extraLight,
  props.thin && fonts.thin,
];
