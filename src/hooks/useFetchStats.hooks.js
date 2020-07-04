
// ========================================================================================
/*                                                                                      *
 * HOOK: FETCH STATS                                                                     *
 *                                                                                      */
// ========================================================================================

// * Lib
import  { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';

// * Util
import { fetchStatsPending, fetchStatsSuccess, retryErrors, loadMore,popStack, fetchStat} from '@actions';


// * Styles

// * Display/UI


 export function useFetchStats () {

    const [refetch,setRefetch] = useState(false)
    const dispatch = useDispatch();
    
    //Selectors to fetch data from the application store
    const {data,next_cursor,count} = useSelector(state=>state.stats,stats=>stats.data.lenght)
    const errors = useSelector(state=>state.stack.error,error=>error.lenght)
    const stackCursor = useSelector(state=>state.stack.stack_cursor,stack_cursor=>stack_cursor)
    const stat = useSelector(state=>state.stack.success[next_cursor],stack=>stack[next_cursor])



    const  hydrateStack =  useCallback(async ()=>{
        if(stat && refetch){
            const {actual_cursor} = stat
            try{
                setRefetch(false)
                dispatch(fetchStatsSuccess(stat.res))
                dispatch(popStack(actual_cursor))
                dispatch(retryErrors(errors))  
                dispatch(loadMore(stackCursor))
            }
            catch(error){
                setRefetch(false)
            } 
        }
        else{
            dispatch(fetchStatsPending())
            try{

                setRefetch(false)
                    await dispatch(fetchStat(next_cursor))
                    dispatch(loadMore(stackCursor))
            }
            catch(error){
                setRefetch(false)
            }
     
        }
    },[dispatch,next_cursor,stat,refetch,errors,stackCursor])

    useEffect(()=>{
      if(!data || refetch) hydrateStack()
    },[hydrateStack,data,refetch])
    
    return  {data,count, setRefetch} 
}
