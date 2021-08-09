// IMPORTS
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from './logger';

// EXPORTS
export default applyMiddleware(thunk, logger);
