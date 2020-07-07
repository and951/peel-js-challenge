import { css } from '@emotion/core';
import theme from '@styles/theme';

export default css({
  justifyContent: 'center',

  '.m-rowItem': {
    justifyContent: 'space-between',

    borderBottom: `1px solid ${theme.colors.santasgray}`,
    alignItems: 'center',
    width: '80%',
    '&__date-column': {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
});
