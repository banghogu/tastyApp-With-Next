import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import Loading from '../../components/Loading'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import Loader from '../../components/Loader'
import SearchFilter from '../../components/SearchFilter'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const StoreListPage = () => {
  const router = useRouter()
  const ref = useRef()
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { searchText,searchDistrict } = useSelector((state) => state.searchSlice)

  const searchParams = {
    q:searchText,
    district:searchDistrict
  }

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios.get("http://localhost:3000/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams
      }
    })
    return data
  }

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError
  } = useInfiniteQuery(['stores', searchParams], fetchStores, {
    getNextPageParam: (lastPage) => lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  })


  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 1500);
    }
    return () => clearTimeout(timerId);

  }, [isPageEnd, fetchNext, hasNextPage])

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (

    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading && (<Loading />)}
        {stores?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((store, i) => (
              <li
                className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
                key={i}
                onClick={()=>router.push(`/stores/${store.crtfc_upso_mgt_sno}`)}
              >
                <div className="flex gap-x-4">
                  <Image
                    src={
                      store?.bizcnd_code_nm
                        ? `/images/markerImages/${store?.bizcnd_code_nm}.png`
                        : "/images/markerImages/default.png"
                    }
                    width={48}
                    height={48}
                    alt="아이콘 이미지"
                  />
                  <div>
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.upso_nm}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.upso_nm}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <div className="text-sm font-semibold leading-6 text-gray-900">
                    {store?.rdn_code_nm}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {store?.tel_no || "번호없음"} | {store?.crtfc_gbn_nm} |{" "}
                    {store?.bizcnd_code_nm}
                  </div>
                </div>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className='w-full touch-none h-10 mb-10' ref={ref} />
    </div>
  )
}

export default StoreListPage


