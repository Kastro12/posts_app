import Header from "../components/header/Header";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "../components/forms/search/SearchForm";
import { linkToParamObject, getUniqueItems } from "../utils/auxiliary";
import Pagination from "../components/pagination/Pagination";
import {
  getPostsByPage,
  getUsersByUsersId,
  getUsersByUserName,
} from "../store/posts";

const Posts: FC = () => {
  const [postsData, setPostsData] = useState<any>(false);

  const location = useLocation();
  let paramObject = linkToParamObject(location.search);

  const currentPage =
    paramObject && paramObject._page ? Number(paramObject._page) : Number(1);

  const currentSearch =
    paramObject && paramObject.searchTerms ? paramObject.searchTerms : ``;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let usersIDs;
        let usersByUserName;
        if (currentSearch) {
          usersByUserName = await getUsersByUserName(currentSearch);
          usersIDs = usersByUserName.map((user: { id: number }) => user.id);
          if (Array.isArray(usersIDs) && usersIDs.length < 1) {
            setPostsData(false);
            return;
          }
        }

        const postsData = await getPostsByPage(usersIDs);
        if (postsData) {
          const updatedAndSetPostData = (users: []) => {
            const postsWithUsers = postsData.posts.map((post: any) => {
              const postUser = users.find(
                (user: any) => user.id === post.userId
              );
              return { ...post, user: postUser };
            });

            setPostsData({
              ...{ posts: postsWithUsers },
              totalPosts: postsData.totalPosts,
            });
          };

          if (usersByUserName) {
            updatedAndSetPostData(usersByUserName);
          } else {
            const usersId = getUniqueItems(postsData.posts, "userId");
            const users = await getUsersByUsersId(usersId);
            if (users) {
              updatedAndSetPostData(users);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, currentSearch]);

  return (
    <>
      <Header title="All posts" />
      <div className="container">
        <SearchForm initialValue={currentSearch} />

        {postsData ? (
          <div className="row items mt-4">
            <Pagination
              totalItems={
                postsData && postsData.totalPosts ? postsData.totalPosts : false
              }
            />
            {postsData.posts.map((post: any) => {
              return (
                <div className="col-lg-6 item mb-4" key={post.id}>
                  <div className="card">
                    <div className="card-body">
                      <p>
                        <strong>User: </strong>
                        <small>
                          {post.user && post.user.name ? post.user.name : ""}
                        </small>
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
        ) : (
          <div className="row mt-5">
            <p className="text-center">NO DATA</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
