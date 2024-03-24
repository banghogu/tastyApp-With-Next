import { useRouter } from 'next/router'
import React from 'react'

const StoreEdit = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            store edit {id}
        </div>
    )
}

export default StoreEdit
