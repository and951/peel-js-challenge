import theme from '@styles/theme';
import { float } from '@styles/animations'
import { css } from '@emotion/core';

export default css({
  flexDirection:'column',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor: theme.colors.white,

  padding: '5%',
  overflow:'hidden',
  '.o-virtualizedList':{

    '&__overlay' :{
      height:'10%',
      backgroundColor :'rgba(255, 255, 255, 0.8)',
      width: '90%',
      position: 'absolute',
      zIndex: 1,
      left: '5%',
      bottom: 0,
 
      [theme.mediaQueries[3]]: {
        height:'20%',
        width: '70%',
        left: '15%',
      },
    },
    '&__downIcon':{
      animation: `${float} 1s ease infinite`,
      zIndex: 1,
      
    }

  }
});


