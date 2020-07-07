import theme from '@styles/theme';
import { css } from '@emotion/core';

export default css({
  '.o-header__navbarWrapper': {
    width: '100%',
    height:'84px',
    flexDirection: 'row',
    zIndex: 4,
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.selago,
    '&__logo':{
      height:'84px',
      width:'195px'
    },
    '&__title':{
      color:theme.colors.azure
    },
    '&__name':{
      marginRight: '5%',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      '&__author':{
        color:theme.colors.azure
      },
    },
    
    
  },

  

});


