// Babel 의 역할
// 1. ES6를 ES5문법으로 변환
// 2. JSX 로더 이용하여 JSX코드를 변환

// component : javascript 클래스

// var : 함수스코프, let :  블록단위
// ES6에서는 let으로 변수선언 하는것이 관습
class Codelab extends React.Component {
  render() { // 모든 react 컴포넌트가 가지고 잇음 : 컴퓨넌트가 어떻게 생길지 정의
    let text = 'Hi I am codelab';
    let style = {
      backgroundColor : 'aqua'
    };
    // JSX : 가독성을 위해 괄호를 붙여주는게 좋음
    return (
      <div style={style}>{text}
        {/*JSX 안에서의 주석표기방식. 컨테이너 위에 작성시 에러*/}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Codelab/>
    );
  }
}

// JSX : HTML + XML(컴포넌트명)을 JS 안에서 읽기쉽게 작성하기 위해
ReactDOM.render(<App/>, document.getElementById('root'));