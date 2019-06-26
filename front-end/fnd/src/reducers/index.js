import { combineReducers } from 'redux';
import ArticleAnalyzerReducer from './ArticleAnalyzerReducer';

const rootReducer = combineReducers({
    result: ArticleAnalyzerReducer
  })

export default rootReducer;
