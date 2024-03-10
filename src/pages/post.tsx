import Header from "../components/header/Header";
import { FC, useEffect, useState } from "react";
import { getPost } from "../store/post";
import { useParams } from "react-router-dom";

const Post: FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(false);
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
  }, []);

  return (
    <>
      <Header title="Posts" />
      <div className="container">
        {post && (
          <div className="col-lg-6 item mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <p>
                  <strong>User: </strong>
                  <small>
                    {post.user && post.user.name ? post.user.name : ""}
                  </small>
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
        )}
      </div>
    </>
  );
};

export default Post;
