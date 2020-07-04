
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
import {useFetchStats} from '@hooks/useFetchStats.hooks'
import statsService from '@services/stats.services'
import {INITIAL_STATS_AMOUNT,AMOUNT_PER_FETCH} from '@constants/'
import { pushStackSuccess} from '@actions';
import {wrapper} from '@store';
import createCounter from '@util/createCounter.util'
import { LOADING_VALUE } from '@constants/';

// * Styles

import {Text,Flex,Box} from '@display/'
import theme from '@styles/theme';
// * Display/UI

const StatsView = (props) => {
   
    const {data,count,setRefetch} =  useFetchStats()

    const isItemLoaded = index => !!data[index];
    
    const Row =  ({ index, style }) => {
        const {ds,y} = data[index]
        return (
          <Flex className="ListItem" style={style} backgroundColor={theme.colors.white} justifyContent='center'>
              <Flex justifyContent='space-between' alignItems='center' width='824px'>
                  <Flex flexDirection='column' justifyContent='space-between'>
                    <Text variant={{ _: 'subhead2Mobile', m: 'subhead2' }} color={index===0?theme.colors.supernova:theme.colors.black} >{ds===LOADING_VALUE?'Loading...':index===0?'Today':ds}</Text>
                    <Text variant={{ _: 'subhead2AltMobile', m: 'subhead2Alt' }} >Overview</Text>
                </Flex>
                    <Text variant={{ _: 'h8Mobile', m: 'h8' }} >{`$${y===LOADING_VALUE?'Loading...':y}`}</Text>
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
                    itemCount={10000}
                    loadMoreItems={()=>{setRefetch(true)}}
                >
                    {({ onItemsRendered, ref }) => (
                    <List
                        className="List"
                        height={800}
                        itemCount={count}
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
    const cursors = createCounter(AMOUNT_PER_FETCH,INITIAL_STATS_AMOUNT)
    await Promise.all(
        cursors.map(async (actualCursor)=>{
            try{
                const res = await statsService(actualCursor)
                if(res.error) {
                    throw(res.error);
                }
                store.dispatch(pushStackSuccess({actual_cursor:actualCursor,res:res}));
            }
            catch(error) {
                const errorCode =  (error.response && error.response.status) || 500
                const errorObj = {actual_cursor:actualCursor,errorMsg:errorCode}
                // store.dispatch(pushStackError(errorObj))
            }
        })
    )
  })

export default StatsView ;