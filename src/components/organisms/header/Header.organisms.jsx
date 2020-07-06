// ========================================================================================
/*                                                                                      *
 * ORGANISM: HEADER                                                                     *
 *                                                                                      */
// ========================================================================================

// * Lib
import React from 'react';

import Link from 'next/link';

// * Util

// * Styles
import additionalStyles from './Header.styles';

// * Display/UI
import { Box, Text, Flex } from '@display';
import { Icon } from '@atoms';

const HeaderOrganism = (props) => {
  return (
    <Box css={additionalStyles}>
      <Flex className={`o-header__navbarWrapper`}>
        <Box  className={'o-header__navbarWrapper__logo'}>
          <Icon icon='Logo'
            size={'100%'}
            />
        </Box>
        <Text variant={{ _: 'subhead2Mobile', m: 'subhead2' }} className='o-header__navbarWrapper__title'> Frontend challenge</Text>
        <Flex className={'o-header__navbarWrapper__name'}>
          <Text variant={{ _: 'subhead2Mobile', m: 'subhead2' }}> Made by</Text>
          <Text className={'o-header__navbarWrapper__name__author'} variant={{ _: 'subhead2Alt', m: 'subhead2Alt' }}> Andrés Jiménez</Text>
        </Flex>

      </Flex>
    </Box>
  );
};

HeaderOrganism.propTypes = {

};

export default HeaderOrganism;
