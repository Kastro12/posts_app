import Header from "../components/header/Header";
import { FC, memo } from "react";
import SearchForm from "../components/forms/search/SearchForm";
import RenderPosts from "./components/RenderPosts";
import { ComponentProps } from "../interfaces/route.interface";

const MemoizedHeader = memo(Header);

const Posts: FC<ComponentProps> = ({ message }) => {
  console.log(`${message} Posts`);

  return (
    <>
      <MemoizedHeader title="All posts" message={message} />

      <div className="container">
        <SearchForm message={message} />
        <RenderPosts message={message} />
      </div>
    </>
  );
};

export default Posts;
