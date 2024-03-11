import { Link, useLocation } from "react-router-dom";
import { objectToQueryString, linkToParamObject } from "../../utils/auxiliary";
import { generatePaginationArray } from "../../utils/routeUtils";
import { ComponentProps } from "../../interfaces/route.interface";
import { FC } from "react";
interface PaginationProps {
  totalItems: string | boolean | number;
}

type PaginationComponent = PaginationProps & ComponentProps;

const Pagination: FC<PaginationComponent> = ({ totalItems, message }) => {
  console.log(`${message} Pagination`);
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
    <nav className="mt-3 mb-5 d-flex justify-content-center">
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
