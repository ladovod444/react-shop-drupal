//https://www.npmjs.com/package/react-paginate

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import GoodsListPaginate from "./GoodsListPaginate";
function PaginatedItems({ itemsPerPage, goods }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    //const currentItems = goods.slice(itemOffset, endOffset);

    // 20 goods
    //itemOffset =


    const currentItems = goods.length >= itemsPerPage ? goods.slice(itemOffset, endOffset) : goods;

    //console.log(`Loading goods = ${goods}`);
    console.log(goods);
    console.log(itemOffset, endOffset)
    console.log(currentItems)
    //console.log(`Loading items = ${currentItems}`);

    const pageCount = Math.ceil(goods.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(event.selected)
        const newOffset = (event.selected * itemsPerPage) % goods.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <GoodsListPaginate currentItems={currentItems} />
            {/*<Items currentItems={currentItems} />*/}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;