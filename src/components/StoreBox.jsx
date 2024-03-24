import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import {
    AiOutlineClose,
    AiOutlineInfoCircle,
    AiOutlineCheck,
    AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import * as currentStoreActions from "../store/modules/currentStore.slice"

const StoreBox = () => {
    const router = useRouter()
    const { currentStore } = useSelector((state) => state.currentStoreSlice)
    const dispatch = useDispatch()

    return (
        <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
            {currentStore.crtfc_upso_mgt_sno && (
                <>
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4 items-center">
                                <Image
                                    src={
                                        currentStore?.bizcnd_code_nm
                                            ? `/images/markerImages/${currentStore?.bizcnd_code_nm}.png`
                                            : "/images/markerImages/default.png"
                                    }
                                    width={40}
                                    height={40}
                                    alt="아이콘 이미지"
                                />
                                <div>
                                    <div className="font-semibold">{currentStore?.upso_nm}</div>
                                    <div className="text-sm">{currentStore?.cob_code_nm}</div>
                                </div>
                            </div>
                            <button type="button" onClick={() => dispatch(currentStoreActions.clearCurrentStore())}>
                                <AiOutlineClose />
                            </button>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="mt-4 flex gap-2 items-center col-span-3">
                                <HiOutlineMapPin />
                                {currentStore?.rdn_code_nm || "주소가 없습니다."}
                            </div>
                        </div>
                        <div className="mt-2 flex gap-2 items-center">
                            <AiOutlinePhone />
                            {currentStore?.tel_no || '전화번호가 등록되어있지 않습니다'}
                        </div>
                        <div className="mt-2 flex gap-2 items-center">
                            <AiOutlineInfoCircle />
                            {currentStore?.crtfc_gbn_nm}
                        </div>
                        <div className="mt-2 flex gap-2 items-center">
                            <AiOutlineCheck />
                            {currentStore?.bizcnd_code_nm}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => router.push(`/stores/${currentStore.crtfc_upso_mgt_sno}`)}
                        className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
                    >
                        상세보기
                    </button>
                </>
            )}
        </div>
    )
}

export default StoreBox
