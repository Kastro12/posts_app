import { FC, useEffect, useState } from "react";
import { getPost } from "../../store/post";
import PostCard from "../../components/card/PostCard";
import { ComponentProps } from "../../interfaces/route.interface";
import { useParams } from "react-router-dom";
import { PostData } from "../../interfaces/post.iterface";

const RenderPost: FC<ComponentProps> = ({ message }) => {
  console.log(`${message} RenderPost`);

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
    <>{post && <PostCard post={post} hasLink={false} message={message} />}</>
  );
};

export default RenderPost;
