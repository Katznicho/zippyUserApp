/* eslint-disable prettier/prettier */
import { useInfiniteQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';


const fetcher = async (limit: number = 20, pageNumber: number = 1, queryUrl: string, status = null, property_id=null,agent_id=null, category_id=null) => {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const token = await AsyncStorage.getItem('token');
        
        headers.append('Authorization', `Bearer ${token}`);

        // Build the URL based on the presence of the status parameter
        let url = `${queryUrl}?limit=${limit}&page=${pageNumber}`;
        
        if (status !== null) {
            url += `&status=${status}`;
        }

        if(property_id){
            url += `&property_id=${property_id}`;
        }

        if(agent_id){
            url += `&agent_id=${agent_id}`;
        }

        if(category_id){
            url += `&category_id=${category_id}`;
        }




        const response = await fetch(url, {
            method: 'GET',
            headers,  
        },
        
    );

        const data = await response.json();

        return {
            data: data?.data?.data,
            nextPage: data?.data?.pagination?.current_page + 1,
            total: data?.data?.pagination?.total,
            currentPage: data?.data?.pagination?.current_page,
            lastPage: data?.data?.pagination?.total,
            pageParam: data?.data?.pagination?.current_page + 1,
        };
    } catch (error) {


        if (error instanceof Error) throw new Error(error.message);
        else throw new Error('Something went wrong.');
    }
};



/**
 * Fetches data using the useInfiniteQuery hook and returns the fetched data, loading and error states, and functions for pagination.
 *
 * @return {object} An object containing the fetched data, loading and error states, and functions for pagination.
 */
export default function useFetchInfinite(queryKey: string, url: string, status: any = null, property_id:any=null, agent_id:any=null,category_id:any=null) {
    
    const {
        data,
        isError,
        isLoading,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,

    } = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam = 1 }) => fetcher(20, pageParam, url, status, property_id, agent_id),
        getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
        getPreviousPageParam: (firstPage, allPages) => firstPage.currentPage - 1,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        // refetchInterval: 10000,
    });

    return {
        data,
        isError,
        isLoading,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,
    };
}