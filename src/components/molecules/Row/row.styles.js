import { css } from '@emotion/core';
import theme from '@styles/theme';

export default css({
  backgroundColor:theme.colors.white,
  justifyContent:'center',
  borderBottom:  `1px solid ${theme.colors.santasgray}`,

  '.m-rowItem':{
    justifyContent:'space-between',
    alignItems:'center',
    width:'824px',
    '&__date-column' :{
      flexDirection:'column', 
      justifyContent:'space-between'
    }
  }

});