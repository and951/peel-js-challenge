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
import { useFetchStats } from '@hooks/useFetchStats.hooks'
import { TOTAL_AMOUNT_OF_STATS } from '@constants/'

const VirtualizedList = ({ virualizedItemStyle = '', date = '', revenue = '0', isFirst = false, loading = false }) => {
  const { success, setRequiredStat } = useFetchStats()
  const isItemLoaded = index => !!success[index];
  const GenerateRow = ({ index, style }) => {
    const stackIndex = getStackIndex(index)
    const stackCellIndex = getStackCellIndex(index)
    const { ds: date, y: revenue } = success[stackIndex]?.results?.all[stackCellIndex] || { ds: undefined, y: undefined }
    const isFirst = index === 0
    return (
      <Row virualizedItemStyle={style} date={isFirst ? 'Today' : date} revenue={revenue} isFirst={isFirst} loading={!date || !revenue} />
    );
  }

  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.mediaQuery.isMobile})`,
  });

  const responsiveHeight = isMobile ? 400 : 800;
  const responsiveWidth = isMobile ? 300 : 1118;
  const responsiveElement = isMobile ? responsiveHeight / 7 : responsiveHeight / 10;

  return (
    <Flex
      css={VirtualizedListStyles}
    >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={TOTAL_AMOUNT_OF_STATS}
        loadMoreItems={(index) => {
          const stackIndex = getStackIndex(index)
          setRequiredStat(stackIndex)
        }}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
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
