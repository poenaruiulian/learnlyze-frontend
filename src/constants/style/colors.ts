// Opacity code in hexadecimal codes
// https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4

export const colors = {
  electricViolet: '#9747FF',
  electricViolet80: '#9747FFCC',
  electricViolet60: '#9747FF99',

  tulipTree: '#EFB036',
  tulipTree80: '#EFB036CC',
  tulipTree60: '#EFB03699',
  tulipTree40: '#EFB03666',

  persianGreen: '#009EA2',
  persianGreen80: '#009EA2CC',
  persianGreen60: '#009EA299',
  persianGreen40: '#009EA266',

  biscay: '#1A2C5B',
  biscay80: '#1A2C5BCC',
  biscay60: '#1A2C5B99',
  biscay30: '#1A2C5B4D',

  eastBay: '#40527B',

  white: '#FFFFFF',
  white80: '#FFFFFFCC',
  white50: '#FFFFFF80',

  alto: '#D9D9D9',
  alto50: '#D9D9D980',

  nevada: '#666A6D',

  tundora: '#444444',
  tundora80: '#444444CC',
  tundora60: '#44444499',

  balticSea: '#1C1B1F',
  balticSea75: '#1C1B1FBF',

  bunker: '#0B0E15',
  bunker60: '#0B0E1599',

  black: '#000000',
  black25: '#00000040',

  transparent: '#00000000',
};

export interface ColorInterface {
  electricViolet?: boolean;
  electricViolet80?: boolean;
  electricViolet60?: boolean;

  tulipTree?: boolean;
  tulipTree80?: boolean;
  tulipTree60?: boolean;
  tulipTree40?: boolean;

  persianGreen?: boolean;
  persianGreen80?: boolean;
  persianGreen60?: boolean;
  persianGreen40?: boolean;

  biscay?: boolean;
  biscay80?: boolean;
  biscay60?: boolean;
  biscay30?: boolean;

  eastBay?: boolean;

  white?: boolean;
  white80?: boolean;
  white50?: boolean;

  alto?: boolean;
  alto50?: boolean;

  nevada?: boolean;

  tundora?: boolean;
  tundora80?: boolean;
  tundora60?: boolean;

  balticSea?: boolean;
  balticSea75?: boolean;

  bunker?: boolean;
  bunker60?: boolean;

  black?: boolean;
  black25?: boolean;

  transparent?: boolean;
}

export const handleColor = (props: ColorInterface) => [
  props.electricViolet && { color: colors.electricViolet },
  props.electricViolet80 && { color: colors.electricViolet80 },
  props.electricViolet60 && { color: colors.electricViolet60 },

  props.tulipTree && { color: colors.tulipTree },
  props.tulipTree80 && { color: colors.tulipTree80 },
  props.tulipTree60 && { color: colors.tulipTree60 },
  props.tulipTree40 && { color: colors.tulipTree40 },

  props.persianGreen && { color: colors.persianGreen },
  props.persianGreen80 && { color: colors.persianGreen80 },
  props.persianGreen60 && { color: colors.persianGreen60 },
  props.persianGreen40 && { color: colors.persianGreen40 },

  props.biscay && { color: colors.biscay },
  props.biscay80 && { color: colors.biscay80 },
  props.biscay60 && { color: colors.biscay60 },
  props.biscay30 && { color: colors.biscay30 },

  props.eastBay && { color: colors.eastBay },

  props.white && { color: colors.white },
  props.white80 && { color: colors.white80 },
  props.white50 && { color: colors.white50 },

  props.alto && { color: colors.alto },
  props.alto50 && { color: colors.alto50 },

  props.nevada && { color: colors.nevada },

  props.tundora && { color: colors.tundora },
  props.tundora80 && { color: colors.tundora80 },
  props.tundora60 && { color: colors.tundora60 },

  props.balticSea && { color: colors.balticSea },
  props.balticSea75 && { color: colors.balticSea75 },

  props.bunker && { color: colors.bunker },
  props.bunker60 && { color: colors.bunker60 },

  props.black && { color: colors.black },
  props.black25 && { color: colors.black25 },

  props.transparent && { color: colors.transparent },
];
