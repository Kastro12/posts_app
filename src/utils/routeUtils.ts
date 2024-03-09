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
