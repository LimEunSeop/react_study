import { combineReducers } from 'redux'; // 함수
import counter from './counter';
import ui from './ui';

const reducers = combineReducers({
    counter, ui
});

export default reducers;
