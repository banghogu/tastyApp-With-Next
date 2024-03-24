import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader'
import Map from '../../../components/Map'
import Marker from '../../../components/Marker'

const StoreDetail = () => {
    const router = useRouter()
    const { id } = router.query

    const fetchStore = async () => {
        const { data } = await axios(`http://localhost:3000/api/stores?id=${id}`)
        return data
    }
    const { data: store, isFetching, isError, isSuccess } = useQuery(`store-${id}`, fetchStore, {
        enabled: !!id,
        refetchOnWindowFocus: false
    })

    if (isError) {
        return (
            <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
                다시 시도해주세요
            </div>
        );
    }
    if (isFetching) {
        <Loader />
    }

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="md:flex justify-between items-center py-4 md:py-0">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            {store?.upso_nm}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            {store?.rdn_code_nm}
                        </p>
                    </div>
                    {/* {status === "authenticated" && store && (
                        <div className="flex items-center gap-4 px-4 py-3">
                            {<Like storeId={store.id} />}
                            <Link
                                className="underline hover:text-gray-400 text-sm"
                                href={`/stores/${store?.id}/edit`}
                            >
                                수정
                            </Link>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="underline hover:text-gray-400 text-sm"
                            >
                                삭제
                            </button>
                        </div>
                    )} */}
                </div>

                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                카테고리
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.cob_code_nm}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                주소
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.rdn_code_nm}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                위도
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.y_dnts}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                경도
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.x_cnts}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                연락처
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.tel_no}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                식품인증구분
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.crtfc_gbn_nm}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                업종명
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {store?.cob_code_nm}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {isSuccess && (
                <>
                    <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
                        <Map lat={store?.y_dnts} lng={store?.x_cnts} zoom={1} />
                        <Marker store={store} />
                    </div>
                </>
            )}
        </>
    )
}

export default StoreDetail
