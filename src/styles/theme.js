// global.js - place in your app where global styles reside
import emotionReset from 'emotion-reset';
import { injectGlobal } from 'emotion';

/* eslint-disable no-unused-expressions */
injectGlobal`
${emotionReset}

// You can continue writing global styles, for instance
*, *::after, *::before {
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

html {
  scroll-behavior: smooth;
}

body, input {
  letter-spacing: 0.7px;
  font-family: 'Open Sans', sans-serif;
}

input {
  font-weight: 300;
}

picture {
  display: block;
}

strong {
  font-weight: 600;
}

em {
  font-style: italic;
}
`;
/* eslint-enable */

const colors = {
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
  santasgray: '#A2A3B2',
  supernova: '#FDCD00',
  zircon : '#F8FAFF',
  selago : '#F2F6FE'
  
};

const fontSizes = [14, 16, 18, 20, 24, 28, 35, 46, 60];
const lineHeight = [1, 1.2, 1.3, 1.4, 1.5];

const fontWeightValues = ['300', '400', '500', '700', '800', '900'];
const fontWeights = {
  light: fontWeightValues[0],
  regular: fontWeightValues[1],
  medium: fontWeightValues[2],
  bold: fontWeightValues[3],
  extraBold: fontWeightValues[4],
  black: fontWeightValues[5],
};

const space = [0, 5, 10, 15, 20, 25, 30];

export const breakpointsArr = ['376px', '576px', '768px', '992px', '1200px', '1400px'];
const containerWidth = ['1400px'];

const mediaQueries = breakpointsArr.map((bp) => `@media (min-width: ${bp})`);

const typography = {
  fontFamily: "'Open Sans', sans-serif",
  letterSpacing: '0.7px',
  lineHeight: lineHeight[0],
};



const theme = {
  typography,
  colors,
  containerWidth,
  fontSizes: {
    small: fontSizes[0],
    body: fontSizes[1],
    smallHeading: fontSizes[3],
    mediumHeading: fontSizes[4],
    largeHeading: fontSizes[5],
  },

  space,
  mediaQueries,
  lineHeight,
  breakpoints: {
    xxs: breakpointsArr[0],
    xs: breakpointsArr[1],
    s: breakpointsArr[2],
    m: breakpointsArr[3],
    l: breakpointsArr[4],
    xl: breakpointsArr[5],
    xxl: breakpointsArr[6],
  },
  mediaQuery: {
    isMobile: '991px',
    notMobile: '992px',
  },
  fontWeights: {
    light: fontWeightValues[0],
    regular: fontWeightValues[1],
    medium: fontWeightValues[2],
    bold: fontWeightValues[3],
    extraBold: fontWeightValues[4],
    black: fontWeightValues[5],
  },
  text: {
    h1: {
      ...typography,
      fontSize: fontSizes[7],
      fontWeight: fontWeights.medium,
    },
    h1Mobile: {
      ...typography,
      fontSize: fontSizes[7],
      fontWeight: fontWeights.medium,
    },
    h2: {
      ...typography,
      fontSize: fontSizes[7],
      fontWeight: fontWeights.regular,
    },
    h2Mobile: {
      ...typography,
      fontSize: fontSizes[6],
      fontWeight: fontWeights.regular,
    },
    h3: {
      ...typography,
      fontSize: fontSizes[6],
      fontWeight: fontWeights.medium,
    },
    h3Mobile: {
      ...typography,
      fontSize: fontSizes[6],
      fontWeight: fontWeights.medium,
    },
    h4: {
      ...typography,
      fontSize: fontSizes[6],
      fontWeight: fontWeights.regular,
    },
    h4Mobile: {
      ...typography,
      fontSize: fontSizes[6],
      fontWeight: fontWeights.regular,
    },
    h5: {
      ...typography,
      fontSize: fontSizes[5],
      fontWeight: fontWeights.medium,
      lineHeight: lineHeight[1],
    },
    h5Mobile: {
      ...typography,
      fontSize: fontSizes[4],
      fontWeight: fontWeights.medium,
      lineHeight: lineHeight[3],
    },
    h6: {
      ...typography,
      fontSize: fontSizes[5],
      fontWeight: fontWeights.regular,
    },
    h6Mobile: {
      ...typography,
      fontSize: fontSizes[5],
      fontWeight: fontWeights.regular,
    },
    h7: {
      ...typography,
      fontSize: fontSizes[4],
      fontWeight: fontWeights.regular,
      lineHeight: lineHeight[3],
    },
    h7Mobile: {
      ...typography,
      fontSize: fontSizes[3],
      fontWeight: fontWeights.regular,
      marginBottom: '20px',
      lineHeight: lineHeight[3],
    },
    h8: {
      ...typography,
      fontSize: fontSizes[3],
      fontWeight: fontWeights.bold,
    },
    h8Mobile: {
      ...typography,
      fontSize: fontSizes[2],
      fontWeight: fontWeights.bold,
    },
    subhead1: {
      ...typography,
      fontSize: fontSizes[3],
      fontWeight: fontWeights.medium,
    },
    subhead1Mobile: {
      ...typography,
      fontSize: fontSizes[3],
      fontWeight: fontWeights.medium,
    },
    subhead2: {
      ...typography,
      fontSize: fontSizes[2],
      fontWeight: fontWeights.light,
    },
    subhead2Mobile: {
      ...typography,
      fontSize: fontSizes[2],
      fontWeight: fontWeights.light,
    },
    subhead2Alt: {
      ...typography,
      fontSize: fontSizes[0],
      fontWeight: fontWeights.regular,
    },
    subhead2AltMobile: {
      ...typography,
      fontSize: fontSizes[0],
      fontWeight: fontWeights.regular,
    }
  }
    
};

export default theme;
