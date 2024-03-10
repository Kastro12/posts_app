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

import PostCard from "../components/card/PostCard";

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
              return <PostCard post={post} key={post.id} hasLink={true} />;
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
