// Babel 의 역할
// 1. ES6를 ES5문법으로 변환
// 2. JSX 로더 이용하여 JSX코드를 변환

// component : javascript 클래스

// var : 함수스코프, let :  블록단위
// ES6에서는 let으로 변수선언 하는것이 관습
class Codelab extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello {this.props.name}</h1>
                <h2>{this.props.number}</h2>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

// React.PropTypes는 Deprecated 됨.
// https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.1/prop-types.js 라이브러리를 다시 사용하자
// 유지보수 하기 위해서 PropTypes는 필요하다. 동료프로그래머가 내 컴포넌트 사용시, props의 타입과 필수여부를 확인하는 시간이 단축됨.
Codelab.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number.isRequired
};

Codelab.defaultProps = {
    name: 'Unknown'
};

class App extends React.Component {
    render() {
        return (
            <Codelab name={this.props.name} number={this.props.number}>{this.props.children}</Codelab> // 슬래쉬 실수 하지말자
        );
    }
}

// JSX : HTML + XML(컴포넌트명)을 JS 안에서 읽기쉽게 작성하기 위해
ReactDOM.render(<App number={5}>I am your child</App>, document.getElementById('root'));
