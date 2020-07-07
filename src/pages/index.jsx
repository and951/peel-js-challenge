
// ========================================================================================
/*                                                                                      *
 * PAGE: STATS PAGE                                                                    *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';


// * Util
import { INITIAL_STATS_AMOUNT, AMOUNT_PER_FETCH } from '@constants/'
import { wrapper } from '@store';
import { createCounter } from '@util'
import statsService from '@services/stats.services'
import { pushStackSuccess, pushStackError } from '@actions/'
import dynamic from "next/dynamic";


// * Styles
import theme from '@styles/theme'

// * Display/UI
import { Text, Flex } from '@display/';
import { Header } from '@organisms';
//Virtualized needs to be imported only on client side as it needs to access to the window property.
const VirtualizedList = dynamic(() => import("@organisms/virtualized-list/VirualizedList.organism"), {
    ssr: false,
  });

const StatsView = (props) => {
    return (
        <Flex
            backgroundColor={theme.colors.zircon}
            flexDirection={'column'}
            height='100vh'
        >
            <Header />
            <Flex flexDirection='column' alignSelf='center' justifyContent='space-evenly' height='100%'>
                <Flex flexDirection='column'>
                    <Text variant={{ _: 'h4Mobile', m: 'h4' }} fontWeight={theme.fontWeights.light} >Revenue Data</Text>
                    <Text variant={{ _: 'subhead2Mobile', m: 'subhead2' }} color={theme.colors.santasgray}>Showing all data</Text>
                </Flex>
                <VirtualizedList />
            </Flex>
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
                store.dispatch(pushStackError({ next_cursor: actualCursor + AMOUNT_PER_FETCH, error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }))
            }
        })
    )
})

export default StatsView;