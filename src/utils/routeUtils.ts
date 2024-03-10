import { lazy } from "react";
import { Route } from "../interfaces/route.interface";

interface PagesArray extends Array<Route> {}

export const multiLazyLoadPage = (pages: PagesArray) => {
  return pages.map((page: Route) => ({
    id: page.id,
    link: page.link,
    component: lazy(() => page.component()),
  }));
};

interface PaginationInfo {
  paginationPages: number[];
  previousPage: number | false;
  nextPage: number | false;
}

export const generatePaginationArray = (
  currentPage: number,
  totalPages: number
): PaginationInfo => {
  const paginationPages: number[] = [];
  let previousPage: number | false = false;
  let nextPage: number | false = false;

  if (currentPage < 3) {
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      paginationPages.push(i);
    }
    if (currentPage !== 1) {
      previousPage = currentPage - 1;
    }
    if (currentPage < totalPages) {
      nextPage = currentPage + 1;
    }
  } else if (currentPage >= totalPages - 1) {
    for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
      paginationPages.push(i);
    }
    if (currentPage > 1) {
      previousPage = currentPage - 1;
    }
    if (currentPage !== totalPages) {
      nextPage = currentPage + 1;
    }
  } else {
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      paginationPages.push(i);
    }
    previousPage = currentPage - 1;
    nextPage = currentPage + 1;
  }

  return { paginationPages, previousPage, nextPage };
};
