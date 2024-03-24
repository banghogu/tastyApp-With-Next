export default async function handler(req, res) {
    const { page = '', id, q, district } = req.query;
    if (id) {
        const stores = await import('../../data/store_data.json');
        const item = stores["DATA"].find(store => store.crtfc_upso_mgt_sno === parseInt(id));

        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: "Item not found", id, item, });
        }
    } else if (page) {
        const itemsPerPage = 10;
        const pageInt = parseInt(page);
        const stores = await import('../../data/store_data.json');
        let filteredStores = stores["DATA"];

        // q와 district에 따라 필터링
        if (q) {
            filteredStores = filteredStores.filter(store => store.upso_nm.includes(q));
        }

        if (district) {
            filteredStores = filteredStores.filter(store => store.rdn_code_nm.includes(district));
        }

        const totalItems = filteredStores.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // 페이지 번호에 따라 요청된 아이템 범위를 계산
        const startIndex = (pageInt - 1) * itemsPerPage;
        const endIndex = pageInt * itemsPerPage;

        const newStores = filteredStores.sort((a, b) => b.y_dnts - a.y_dnts).slice(startIndex, endIndex);

        // id 값을 추가
        const storesWithId = newStores.map((store, index) => ({
            id: startIndex + index + 1,
            ...store
        }));

        res.status(200).json({
            page: pageInt,
            data: storesWithId,
            totalCount: totalItems,
            totalPage: totalPages
        });
    }
    else {
        const stores = await import('../../data/store_data.json');
        const newStores = stores["DATA"].sort((a, b) => b.y_dnts - a.y_dnts)
        res.status(200).json(newStores);
    }
}

