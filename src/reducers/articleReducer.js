export const initialState = {
  articles: [],
  errors: [],
};

const articleReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'FETCH_ARTICLES':
      return Object.assign(
        {}, state, { articles: action.payload },
      );

    case 'ADD_ARTICLE':
      return Object.assign(
        {}, { articles: [ ...state.articles, action.payload ] },
      );

    case 'ADD_ARTICLE_ERROR':
      return Object.assign(
        {}, { errors: action.payload },
      );

    case 'DELETE_ARTICLE': {
      return Object.assign(
        {}, state, { articles: state.articles.filter( article => article.slug !== action.payload.slug ) },
      );
    }

    case 'DELETE_ARTICLE_ERROR': {
      return Object.assign(
        {}, state, { errors: action.payload },
      );
    }

    case 'EDIT_ARTICLE_SUCCESS': {
      console.log( state.articles );
      // const updatedArticle = state.articles.map(
      //   article => ( article.id !== +action.payload.id ? article : action.payload ),
      // );
      return Object.assign(
        {}, state, { articles: state.articles },
      );
    }

    default:
      return state;
  }
};

export default articleReducer;