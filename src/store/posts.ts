import axios from "axios";
import { objectToQueryString, linkToParamObject } from "../utils/auxiliary";

export const getPostsByPage = (usersIds?: number[]) => {
  const search = window.location.search;
  let paramObject = search ? linkToParamObject(search) : {};

  const currentPage: string | boolean =
    paramObject && paramObject._page ? paramObject._page : false;

  interface ParamObject {
    _page?: string;
    _limit?: string;
  }
  let params: ParamObject = { _limit: "10" };
  if (currentPage) params = { ...params, _page: currentPage };

  let queryString = objectToQueryString(params);

  if (usersIds)
    queryString += usersIds.map((id: number) => `&userId=${id}`).join("&");

  const fetchData = async () => {
    const posts = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?${queryString}`
    );
    const totalPosts = posts.headers["x-total-count"];
    if (posts && totalPosts) {
      const postsId = posts.data.map((post: any) => ({
        id: post.id,
      }));

      const comments = await getCommentsByPostsId(postsId);
      if (comments) {
        const postsWithComments = posts.data.map((post: any) => {
          const postComments = comments.filter(
            (comment: any) => comment.postId === post.id
          );
          return { ...post, comments: postComments };
        });

        return { ...{ posts: postsWithComments }, totalPosts };
      }
    }
  };
  return fetchData();
};

export const getCommentsByPostsId = (postsId: []) => {
  const fetchData = async () => {
    const postIdString = postsId
      .map((post: { id: number }) => `postId=${post.id}`)
      .join("&&");

    const comments = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?${postIdString}`
    );

    if (comments) return comments.data;
  };
  return fetchData();
};

export const getUsersByUsersId = (usersId: number[]) => {
  const fetchData = async () => {
    const userIdString = usersId.map((id: number) => `id=${id}`).join("&");

    const users = await axios.get(
      `https://jsonplaceholder.typicode.com/users?${userIdString}`
    );

    if (users) return users.data;
  };
  return fetchData();
};

export const getUsersByUserName = (search: string) => {
  const fetchData = async () => {
    const users = await axios.get(
      `https://jsonplaceholder.typicode.com/users?q=${search}`
    );

    if (users) return users.data;
  };
  return fetchData();
};
