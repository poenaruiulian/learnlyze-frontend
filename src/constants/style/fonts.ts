import { StyleSheet } from 'react-native';

export const fonts = StyleSheet.create({
  // #region - General font family fonts
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
  // #endregion
});

export interface FontsInterface {
  black?: boolean;
  extraBold?: boolean;
  bold?: boolean;
  medium?: boolean;
  regular?: boolean;
  light?: boolean;
  extraLight?: boolean;
  thin?: boolean;
}

export const handleFonts = (props: FontsInterface) => [
  props.black && fonts.black,
  props.extraBold && fonts.extraBold,
  props.bold && fonts.bold,
  props.medium && fonts.medium,
  props.regular && fonts.regular,
  props.light && fonts.light,
  props.extraLight && fonts.extraLight,
  props.thin && fonts.thin,
];
