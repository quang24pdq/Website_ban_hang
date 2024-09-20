import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "../../globals.css"
import ReactPaginate from 'react-paginate';
// Example items, to simulate fetching from another resources.
function PaginatedItems({ itemsPerPage, page, length, load }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const pageCount = Math.ceil(length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected);
        load()
        page(newOffset + 1);
    };
    return (
        <>
            <ReactPaginate
                initialPage={0}
                className="pagination-product"
                breakLabel="..."
                nextLabel="Next >>"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                activeLinkClassName="active"
                previousLabel="<< Previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
            />
        </>
    );
}
export default PaginatedItems;