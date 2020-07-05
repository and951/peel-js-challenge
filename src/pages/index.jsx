
// ========================================================================================
/*                                                                                      *
 * PAGE: STATS PAGE                                                                    *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

// * Util
import { useFetchStats } from '@hooks/useFetchStats.hooks'
import { INITIAL_STATS_AMOUNT, AMOUNT_PER_FETCH } from '@constants/'
import { wrapper } from '@store';
import { getStackIndex, getStackCellIndex, createCounter } from '@util'
import statsService from '@services/stats.services'
import { pushStackSuccess, pushStackError } from '@actions/'

// * Styles

import { Text, Flex } from '@display/'
import theme from '@styles/theme';
// * Display/UI

const StatsView = (props) => {

    const { success, setRequiredStat } = useFetchStats()
    const isItemLoaded = index => !!success[index];
    const Row = ({ index, style }) => {
        const stackIndex = getStackIndex(index)
        const stackCellIndex = getStackCellIndex(index)
        const { ds, y } = success[stackIndex]?.results?.all[stackCellIndex] || { ds: undefined, y: undefined }
        const date = !ds ? 'Loading...' : index === 0 ? 'Today' : ds
        const revenue = y || 'Loading...'
        return (
            <Flex className="ListItem" style={style} backgroundColor={theme.colors.white} justifyContent='center'>
                <Flex justifyContent='space-between' alignItems='center' width='824px'>
                    <Flex flexDirection='column' justifyContent='space-between'>
                        <Text variant={{ _: 'subhead2Mobile', m: 'subhead2' }} color={index === 0 ? theme.colors.supernova : theme.colors.black} >{date}</Text>
                        <Text variant={{ _: 'subhead2AltMobile', m: 'subhead2Alt' }} >Overview</Text>
                    </Flex>
                    <Text variant={{ _: 'h8Mobile', m: 'h8' }} >{`$${revenue}`}</Text>
                </Flex>
            </Flex>
        );
    }
    return (
        <Flex
            flexDirection='column'
            backgroundColor={theme.colors.zircon}
            justifyContent='space-between'
            alignItems='center'
            height='100vh'
            width='100vw'
        >
            <Text variant={{ _: 'h2Mobile', m: 'h2' }}  >Revenue Data</Text>
            <Text variant={{ _: 'subhead2Mobile', m: 'subhead2' }}>Showing all data</Text>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={2000}
                loadMoreItems={(index) => {
                    const stackIndex = getStackIndex(index)

                    console.table({ 'loadMoreItems': stackIndex })
                    setRequiredStat(stackIndex)
                }}
            >
                {({ onItemsRendered, ref }) => (
                    <List
                        className="List"
                        height={800}
                        itemCount={2000}
                        itemSize={88}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        width={1118}
                    >
                        {Row}
                    </List>
                )}
            </InfiniteLoader>
        </Flex>

    )
}



export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    const cursors = createCounter(AMOUNT_PER_FETCH, INITIAL_STATS_AMOUNT)
    await Promise.all(
        cursors.map(async (actualCursor) => {
            try {
                const res = await statsService(actualCursor)
                if (res.error) throw (res.error);
                store.dispatch(pushStackSuccess(res));
            }
            catch (error) {
                store.dispatch(pushStackError({ next_cursor: actualCursor+AMOUNT_PER_FETCH, error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }))
            }
        })
    )
})

export default StatsView;