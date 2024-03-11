import Header from "../components/header/Header";
import { FC } from "react";
import { ComponentProps } from "../interfaces/route.interface";
import RenderPost from "./components/RenderPost";

const Post: FC<ComponentProps> = ({ message }) => {
  console.log(`${message} Post`);

  return (
    <>
      <Header title="Post" message={message} />
      <div className="container">
        <RenderPost message={message} />
      </div>
    </>
  );
};

export default Post;
