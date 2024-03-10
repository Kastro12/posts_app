import componentWithPostData, {
  PostsData,
} from "../../hocs/componentWithPostData";
import Pagination from "../../components/pagination/Pagination";
import PostCard from "../../components/card/PostCard";

const RenderPosts = ({ posts, totalPosts }: PostsData) => {
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
        <Pagination totalItems={totalPosts ? totalPosts : false} />
        {posts.map((post: any) => {
          return <PostCard post={post} key={post.id} hasLink={true} />;
        })}
      </div>
    </>
  );
};

export default componentWithPostData(RenderPosts);
