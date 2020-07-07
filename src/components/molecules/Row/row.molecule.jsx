// ========================================================================================
/*                                                                                      *
 * MOLECULE: ROW                                                                        *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
// * Styles
import theme from '@styles/theme';
import RowStyles from './row.styles';

// * Display/UI
import { Flex, Text } from '@display/';
import { Spinner } from '@atoms/';

// * Util
import {formatMoney} from '@util/'

const Row = ({ virualizedItemStyle='', date='', revenue='0', isFirst=false, loading=false }) => (
  <Flex className='ListItem' style={virualizedItemStyle} css={RowStyles}>
    <Flex className='m-rowItem'>
      {loading ? (
        <>
          <Spinner /> <Spinner />
        </>
      ) : (
        <>
          <Flex className='m-rowItem__date-column'>
            <Text
              variant={isFirst?{ _: 'h8Mobile', m: 'h8' }:{ _: 'subhead2Mobile', m: 'subhead2' }}
              color={isFirst ? theme.colors.supernova : theme.colors.black}
            >
              {isFirst?'Today':moment(date).format('MMM,d yyyy')}
            </Text>
            <Text variant={{ _: 'subhead2AltMobile', m: 'subhead2Alt' }}>
              Overall
            </Text>
          </Flex>
          <Text variant={{ _: 'h8Mobile', m: 'h8' }}>{`$${formatMoney(revenue,0)}`}</Text>
        </>
      )}
    </Flex>
  </Flex>
);

const propTypes = {
    date: PropTypes.string,
    revenue: PropTypes.number,
    virualizedItemStyle: PropTypes.string,
    isFirst: PropTypes.bool,
    loading: PropTypes.bool,
  };
  
  
  Spinner.propTypes = propTypes;
export default Row;
