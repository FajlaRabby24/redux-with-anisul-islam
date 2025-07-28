import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postSlice";

const PostsView = () => {
  const { isLoading, posts, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <h1>Post view</h1>
      {isLoading && <h5>Loading..</h5>}
      {error && <h5>{error}</h5>}
      {posts &&
        posts?.map((post) => (
          <article key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </article>
        ))}
    </div>
  );
};

export default PostsView;
