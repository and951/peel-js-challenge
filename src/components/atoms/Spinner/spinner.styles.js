import { css } from '@emotion/core';
import { spin } from '@styles/animations'
import theme from '@styles/theme';

export default css({
  maxWidth: theme.containerWidth[0],
  margin: '0 auto',
  position: 'relative',

  '.loaderIcon': {
    animation: `${spin} 1s ease infinite`
  },

});