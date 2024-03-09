import { Routes, Route, Navigate } from "react-router-dom";
import { multiLazyLoadPage } from "./utils/routeUtils";
export const ROUTES = multiLazyLoadPage([
  {
    id: "posts_component_id",
    link: "/posts",
    component: () => import("./pages/posts"),
  },
  {
    id: "post_component_id",
    link: "/post/:id",
    component: () => import("./pages/post"),
  },
]);

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />

      {ROUTES.map((route) => (
        <Route key={route.id} path={route.link} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default Router;
