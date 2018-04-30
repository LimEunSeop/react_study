import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  rootElement
);

// Hot Module Replacement API  ==> 2018.05.01일 소스해석 마칠것
// Hot Module Replacement란?
// 변화된 부분만 리로딩 해주어 전체 새로고침을 방지하는 기능.
// 이 소스가 없으면 Webpack이 어떤 파일을 어떤 상황에 갈아끼울지 모르게 됨.
// react-hot-loader 플러그인과 같이 동작해야 state가 유지됨
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      rootElement
    );
  });
}
