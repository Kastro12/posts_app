import Header from "../components/header/Header";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../components/forms/search/SearchForm";
import { linkToParamObject } from "../utils/auxiliary";
import RenderPosts from "./components/RenderPosts";

const Posts: FC = () => {
  const location = useLocation();
  let paramObject = linkToParamObject(location.search);

  const currentSearch =
    paramObject && paramObject.searchTerms ? paramObject.searchTerms : ``;

  return (
    <>
      <Header title="All posts" />

      <div className="container">
        <SearchForm initialValue={currentSearch} />
        <RenderPosts />
      </div>
    </>
  );
};

export default Posts;
