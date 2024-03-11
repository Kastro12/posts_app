import { FC } from "react";
import { PostData } from "../../interfaces/post.iterface";
import { Link } from "react-router-dom";
import { ComponentProps } from "../../interfaces/route.interface";

interface PostCardProps extends ComponentProps {
  post: PostData | boolean;
  hasLink: boolean;
}

const PostCard: FC<PostCardProps> = ({ post, hasLink, message }) => {
  console.log(`${message} PostCard`);
  if (typeof post === "boolean") {
    return <></>;
  }

  return (
    <div className="col-lg-6 item mb-4" key={post.id}>
      <div className="card">
        <div className="card-body">
          <p>
            <strong>User: </strong>
            <small>{post.user && post.user.name ? post.user.name : ""}</small>
          </p>
          <h5 className="card-title">{post.title}</h5>
          <p
            className="card-text"
            style={{
              minHeight: "48px",
            }}
          >
            {post.title}
          </p>
          {hasLink && (
            <Link to={`/post/${post.id}`} className="card-link ">
              Read more
            </Link>
          )}

          {post.comments &&
            Array.isArray(post.comments) &&
            post.comments.length > 0 && (
              <>
                <p className="mt-3">
                  <small>
                    <strong>Comments:</strong>
                  </small>
                </p>
                <ul className="post-comments list-group list-group-flush">
                  {post.comments.map((comment: any) => (
                    <li className="list-group-item" key={comment.id}>
                      <p className="text-sm" style={{ color: "#ccc" }}>
                        <small>{comment.email}:</small>
                      </p>
                      <p className="text-sm">
                        <small>{comment.name}</small>
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
