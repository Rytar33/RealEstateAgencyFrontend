import React from "react";
import { Link } from "react-router-dom";

function Pagination({ currentPage, totalPages, handlePageChange }) {
    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ marginLeft: 10, marginRight: 10 }}
            >
                &#x003C;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                    style={{ marginLeft: 10, marginRight: 10 }}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ marginLeft: 10, marginRight: 10 }}
            >
                &#x003E;
            </button>
        </div>
    );
}

export default Pagination;
