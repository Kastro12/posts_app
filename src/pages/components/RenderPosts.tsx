import { FC } from "react";
import componentWithPostData, {
  PostsData,
} from "../../hocs/componentWithPostData";
import Pagination from "../../components/pagination/Pagination";
import PostCard from "../../components/card/PostCard";
import { ComponentProps } from "../../interfaces/route.interface";

export type RenderPosts = PostsData & ComponentProps;

const RenderPosts: FC<RenderPosts> = ({ posts, totalPosts, message }) => {
  console.log(`${message} RenderPosts`);

  if (posts === null) {
    return (
      <div className="row mt-5">
        <p className="text-center">NO DATA</p>
      </div>
    );
  }

  return (
    <>
      <div className="row items mt-4">
        {posts.map((post: any) => {
          return (
            <PostCard
              post={post}
              key={post.id}
              hasLink={true}
              message={message}
            />
          );
        })}
        <Pagination
          totalItems={totalPosts ? totalPosts : false}
          message={message}
        />
      </div>
    </>
  );
};

export default componentWithPostData(RenderPosts);
