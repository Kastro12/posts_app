import axios from "axios";

export const getPost = (postId: string | undefined) => {
  const fetchData = async () => {
    const post = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (post) {
      const comments = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );

      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${post.data.userId}`
      );

      if (comments && user)
        return { ...post.data, comments: comments.data, user: user.data };
    }
  };
  return fetchData();
};
