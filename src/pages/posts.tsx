import Header from "../components/header/Header";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SearchForm from "../components/forms/search/SearchForm";
import { objectToQueryString, linkToParamObject } from "../utils/auxiliary";

const Posts: FC = () => {
  const [postsData, setPostsData] = useState<any>(false);
  const location = useLocation();

  const paramObject = linkToParamObject(location.search);

  console.log("paramObject", paramObject);
  console.log(objectToQueryString(paramObject));

  useEffect(() => {
    const fetchData = async () => {};
    console.log("postsData", postsData);
    console.log("paramObject", paramObject);
  }, [paramObject]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?${objectToQueryString(paramObject)}`
        );

        if (posts) {
          const postIdString = posts.data
            .map((post: any) => `postId=${post.id}`)
            .join("&&");

          const comments = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?${postIdString}`
          );

          const userIds: any = [];
          posts.data.forEach((post: any) => {
            if (!userIds.includes(post.userId)) {
              userIds.push(post.userId);
            }
          });
          const userIdString = userIds
            .map((id: any) => `userId=${id}`)
            .join("&&");

          const users = await axios.get(
            `https://jsonplaceholder.typicode.com/users?${userIdString}`
          );

          if (comments && users) {
            const postsWithComments = posts.data.map((post: any) => {
              const postComments = comments.data.filter(
                (comment: any) => comment.postId === post.id
              );

              const postUser = users.data.find(
                (user: any) => user.id === post.userId
              );

              return { ...post, comments: postComments, user: postUser };
            });
            setPostsData(postsWithComments);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header title="All posts" />
      <div className="container">
        <SearchForm
          initialValues={
            paramObject && paramObject.searchTerms
              ? paramObject.searchTerms
              : ""
          }
          onSearch={() => console.log("zz")}
        />
        <div className="row items mt-4">
          {postsData &&
            postsData.map((post: any) => {
              return (
                <div className="col-lg-4 item mb-4" key={post.id}>
                  <div className="card">
                    <div className="card-body">
                      <p>
                        <strong>User: </strong>
                        <small>{post.user.name}</small>
                      </p>
                      <h5 className="card-title">
                        <Link
                          to={`/post/${post.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#343434",
                            minHeight: "75px",
                            display: "block",
                          }}
                        >
                          {post.title}
                        </Link>
                      </h5>
                      <p
                        className="card-text"
                        style={{
                          minHeight: "48px",
                        }}
                      >
                        {post.title}
                      </p>
                      <Link to={`/post/${post.id}`} className="card-link ">
                        Read more
                      </Link>
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
                                <li
                                  className="list-group-item"
                                  key={comment.id}
                                >
                                  <p
                                    className="text-sm"
                                    style={{ color: "#ccc" }}
                                  >
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
            })}
        </div>
      </div>
    </>
  );
};

export default Posts;
