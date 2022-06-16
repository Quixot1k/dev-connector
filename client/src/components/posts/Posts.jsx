import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/post";
import PostItem from "./PostItem.jsx";
import PostForm from "./PostForm";
import PropTypes from "prop-types";

const Posts = ({ getAllPosts, post: { posts } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
