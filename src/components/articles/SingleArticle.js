import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSingleArticle, deleteArticle } from "../../actions/articleActions";
import SingleArticleView from "./SingleArticleView";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import isEmpty from "../utils/isEmpty";

export class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      deletedArticle: "",
      deleteError: "",
      triggerDelete: false,
    };
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleArticle(this.props.match.params.slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletedArticle === "success") {
      window.location.href = "/";
    }
    if (this.state.triggerDelete === true && nextProps.deleteError.data) {
      toast.error("Unable to delete this article.");
    }
    if (nextProps.article.article) {
      const receivedArticle = nextProps.article.article;
      this.setState({
        article: nextProps.article.article,
      });
    }
  }

  deleteArticle() {
    this.setState({
      triggerDelete: true,
    });
    if (this.props.authUser.isAuthenticated
    && this.props.authUser.username === this.state.article.author.username) {
      this.props.deleteArticle(this.state.article.slug);
    } else {
      alert("You do not have permission to delete this comment");
    }
  }

  render() {
    let content = (
      <SingleArticleView
        deleteArticle={this.deleteArticle}
        slug={this.props.match.params.slug}
        article={this.state.article}
      />
    );

    if (isEmpty(this.state.article)) {
      content = (
        <div className="alert alert-danger" role="alert">
          Unable to find this article
        </div>
      );
    }
    return (
      <Fragment>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-9">
              {content}
            </div>
            <div className="col-md-3">
              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </Fragment>
    );
  }
}

SingleArticle.propTypes = {
  fetchSingleArticle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  article: state.articles.articles,
  deletedArticle: state.articles.deletedArticle,
  deleteError: state.articles.errors,
  authUser: state.loginReducer,
});

export default connect(
  mapStateToProps, { fetchSingleArticle, deleteArticle },
)(SingleArticle);