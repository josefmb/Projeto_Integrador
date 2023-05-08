import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages } = props;
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((p) => (
            <li className={`page-item ${p + 1 === page ? "active" : ""}`}>
              <Link
                className="page-link" to={ `/page/${p + 1}` }>
                {p + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
