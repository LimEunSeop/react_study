import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore } from 'redux';
import reducers from './reducers'; // index.js 파일을 불러오는 것이기 때문에 추가적으로 작성하지 않아도 됨.

import { Provider } from 'react-redux';

const store = createStore(reducers); // 스토어 만들기

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
