// ========================================================================================
/*                                                                                      *
 * ORGANISM: HEADER                                                                     *
 *                                                                                      */
// ========================================================================================

// * Lib
import React from 'react';

// * Util
import { useMediaQuery } from 'react-responsive';

// * Styles
import theme from '@styles/theme';
import additionalStyles from './Header.styles';

// * Display/UI
import { Box, Text, Flex } from '@display';
import { Icon } from '@atoms';

const HeaderOrganism = (props) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.mediaQuery.isMobile})`,
  });
  return (
    <Box css={additionalStyles}>
      <Flex className={`o-header__navbarWrapper`}>
        <Box  className={'o-header__navbarWrapper__logo'}>
          <Icon icon='Logo'
            size={'100%'}
            />
        </Box>
        <Text variant={{ _: 'subhead1Mobile', m: 'subhead1' }} className='o-header__navbarWrapper__title'> Frontend challenge</Text>
        <Flex className={'o-header__navbarWrapper__name'}>
          <Text variant={{ _: 'subhead2AltMobile', m: 'subhead2' }}> Made by</Text>
          <Text className={'o-header__navbarWrapper__name__author'} variant={{ _: 'subheadAltMobile', m: 'subheadAlt' }}> {isMobile?'AJ':'Andrés Jiménez'}</Text>
        </Flex>

      </Flex>
    </Box>
  );
};

HeaderOrganism.propTypes = {

};

export default HeaderOrganism;
