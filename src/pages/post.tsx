import Header from "../components/header/Header";
import { FC, useEffect, useState } from "react";
import { getPost } from "../store/post";
import { useParams } from "react-router-dom";
import PostCard from "../components/card/PostCard";
import { PostData } from "../interfaces/post.iterface";

const Post: FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostData | boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await getPost(id);
        if (post) setPost(post);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header title="Post" />
      <div className="container">
        {post && <PostCard post={post} hasLink={false} />}
      </div>
    </>
  );
};

export default Post;
