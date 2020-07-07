// ========================================================================================
/*                                                                                      *
 * MOLECULE: ROW                                                                        *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';
import PropTypes from 'prop-types';
import InfiniteLoader from "react-window-infinite-loader";
import { useMediaQuery } from 'react-responsive';
import { FixedSizeList as List } from "react-window";

// * Styles
import theme from '@styles/theme';
import VirtualizedListStyles from './VirtualizedList.styles';

// * Display/UI
import { Flex } from '@display/'
import { Row } from '@molecules/'
import { Spinner } from '@atoms/';
import { getStackIndex, getStackCellIndex } from '@util'
import { useStatStack, useWindowDimensions } from '@hooks'
import { TOTAL_AMOUNT_OF_STATS } from '@constants/'
import { Icon } from '@components/atoms';
import Box from '@components/display/Box.display';
import { isSSR } from '@util/';

const VirtualizedList = ({ virualizedItemStyle = '', date = '', revenue = '0', isFirst = false, loading = false }) => {

  const { success, setRequiredStat } = useStatStack()

  //Functions needed by the Virtualized list
  const isItemLoaded = index => !!success[index];
  const GenerateRow = ({ index, style }) => {
    const stackIndex = getStackIndex(index)
    const stackCellIndex = getStackCellIndex(index)
    const { ds: date, y: revenue } = success[stackIndex]?.results?.all[stackCellIndex] || { ds: undefined, y: undefined }
    const isFirst = index === 0
    return (
      <Row virualizedItemStyle={style} date={isFirst ? 'Today' : date} revenue={revenue} isFirst={isFirst} loading={!date || !revenue} index={index}/>
    );
  }

  //Process required to dynamically calculate the virtualized list size
  const { height, width } = useWindowDimensions(isSSR());
  const isMobile = useMediaQuery({query: `(max-width: ${theme.mediaQuery.isMobile})`});
  const responsiveHeight = isMobile ? height * 0.60 : height * 0.6;
  const responsiveWidth = isMobile ? width * 0.70 : width * 0.7;
  const responsiveElement = isMobile ? responsiveHeight / 5 : responsiveHeight / 8;

  return (
    <Flex
      css={VirtualizedListStyles}
    >
      <InfiniteLoader
        className='o-virtualizedList'
        isItemLoaded={isItemLoaded}
        itemCount={TOTAL_AMOUNT_OF_STATS}
        loadMoreItems={(index) => {
          const stackIndex = getStackIndex(index)
          setRequiredStat(stackIndex)
        }}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={responsiveHeight}
            itemCount={TOTAL_AMOUNT_OF_STATS}
            itemSize={responsiveElement}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={responsiveWidth}
          >
            {GenerateRow}
          </List>
        )}

      </InfiniteLoader>
      <Box className='o-virtualizedList__overlay' />
      <Icon color={theme.colors.black}
        icon='down-arrow'
        size={20}
        className='o-virtualizedList__downIcon'
      />
    </Flex>
  );
}

const propTypes = {
  date: PropTypes.string,
  revenue: PropTypes.number,
  virualizedItemStyle: PropTypes.string,
  isFirst: PropTypes.bool,
  loading: PropTypes.bool,
};


Spinner.propTypes = propTypes;
export default VirtualizedList;
