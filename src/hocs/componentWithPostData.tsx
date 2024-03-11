// This Higher Order Component (HOC) fetches a list of 'posts' and the total quantity of 'posts'.
//By altering the parameters 'page' and 'searchTerms', the component retrieves new data.

import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getUsersByUserName,
  getPostsByPage,
  getUsersByUsersId,
} from "../store/posts";
import { linkToParamObject, getUniqueItems } from "../utils/auxiliary";
import { Post, User, Comment } from "../interfaces/post.iterface";

export interface PostsData {
  posts: [{ id: number; user: User; title: string; comments: Comment[] }];
  totalPosts: string;
}

const componentWithPostData = (OriginalComponent: any) => {
  const WithPostsData: FC<any> = (props: { message: string }) => {
    const { ...rest } = props;

    const [postsData, setPostsData] = useState<PostsData | null>(null);
    const location = useLocation();
    const paramObject = linkToParamObject(location.search);
    const currentPage =
      paramObject && paramObject._page ? Number(paramObject._page) : 1;
    const currentSearch =
      paramObject && paramObject.searchTerms ? paramObject.searchTerms : "";

    useEffect(() => {
      const fetchData = async () => {
        try {
          let usersIDs;
          let usersByUserName;
          if (currentSearch) {
            usersByUserName = await getUsersByUserName(currentSearch);
            usersIDs = usersByUserName.map((user: { id: number }) => user.id);
            if (Array.isArray(usersIDs) && usersIDs.length < 1) {
              setPostsData(null);
              return;
            }
          }

          const postsData = await getPostsByPage(usersIDs);
          if (postsData) {
            const updatedAndSetPostData = (users: []) => {
              const postsWithUsers = postsData.posts.map((post: Post) => {
                const postUser = users.find(
                  (user: User) => user.id === post.userId
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
      <OriginalComponent
        posts={postsData ? postsData.posts : null}
        totalPosts={postsData ? postsData.totalPosts : null}
        {...rest}
      />
    );
  };
  return WithPostsData;
};

export default componentWithPostData;
