'use client'
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AccommodationList from '@/components/accommodationList/AccommodationList';
import Loading from '@/components/Loading';
import Loader from '@/components/Loader';

export default function Home() {
  const [isEnd, setIsEnd] = useState(false)
  const ref = useRef()
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting

  const fetchRoom = async ({ page }) => {
    const { data } = await axios.get("http://3.35.216.158:8080/api/accommodation", {
      params: {
        page: page
      }
    });
    return data;
  }

  const { data: allRoom, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['allRoom'],
    queryFn: ({ pageParam = 0 }) => fetchRoom({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1
  });

  const fetchNext = useCallback(async () => {
    setIsEnd(false)
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId
    if (isPageEnd && hasNextPage) {
      setIsEnd(true)
      timerId = setTimeout(() => {
        fetchNext();
      }, 2000);
    }
    return () => clearTimeout(timerId);

  }, [isPageEnd, hasNextPage, fetchNext])

  return (
    <>
      {isLoading && (<Loading />)}
      {allRoom?.pages.map((page, index) => (
        <React.Fragment key={index}>
          <AccommodationList data={page.content} />
        </React.Fragment>
      ))}
      {(isEnd) && <Loader />}
      <div className='w-full touch-none h-10 mb-10' ref={ref} />
    </>
  );
}