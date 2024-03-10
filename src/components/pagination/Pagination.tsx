import { Link, useLocation } from "react-router-dom";
import { objectToQueryString, linkToParamObject } from "../../utils/auxiliary";
import { generatePaginationArray } from "../../utils/routeUtils";

interface PaginationProps {
  totalItems: string | boolean | number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const location = useLocation();
  let paramObject = linkToParamObject(location.search);
  const currentPage =
    paramObject && paramObject._page ? Number(paramObject._page) : Number(1);

  const totalPages = Number(totalItems) / 10;

  const { paginationPages, previousPage, nextPage } = generatePaginationArray(
    currentPage,
    totalPages
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item${previousPage ? "" : " disabled"}`}>
          <Link
            to={`${location.pathname}?${objectToQueryString({
              ...paramObject,
              _page: previousPage,
            })}`}
            className="page-link"
          >
            Previous
          </Link>
        </li>
        {paginationPages.map((page) => (
          <li
            className={`page-item${page === currentPage ? " disabled" : ""}`}
            key={page}
          >
            <Link
              to={`${location.pathname}?${objectToQueryString({
                ...paramObject,
                _page: page,
              })}`}
              className="page-link"
            >
              {page}
            </Link>
          </li>
        ))}

        <li className={`page-item${nextPage ? "" : " disabled"}`}>
          <Link
            to={`${location.pathname}?${objectToQueryString({
              ...paramObject,
              _page: nextPage,
            })}`}
            className="page-link"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
