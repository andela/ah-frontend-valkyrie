import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleArticleItem from './SingleArticleItem';
import { fetchArticles } from '../../actions/articleActions';

export class Article extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState( {
      articles: nextProps.articles.articles,
    } );
  }

  render() {
    return (
      <Fragment>
        <h4> Recent Articles</h4>
        <hr />
        { ( this.state.articles ).map( ( article, key ) => (
          <SingleArticleItem
            key={ key }
            article={ article }
          />
        ) ) }
      </Fragment>
    );
  }
}

Article.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ( {
  articles: state.articles.articles,
} );

export default connect( mapStateToProps, { fetchArticles } )( Article );