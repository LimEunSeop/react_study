// State
// 생성자에서 꼭 초기화를 해야함
// 렌더링 되기전에는 값을 수정할 수 없음
// 값을 수정하려면, 렌더링 되고나서 setState메서드를 사용해야함
// setState는 바뀐 사항을 다시 렌더링(rerendering)해주는 기능이 내장돼있음

class Counter extends React.Component {
    // state는 생성자에서 꼭 초기화를 해야함.
    constructor(props) { // 파라미터가 props로 와야함
        super(props);      // 이것이 있어야 this.state, props에 접근 가능
        this.state = {
            value: 0
        }
        this.handleClick = this.handleClick.bind(this);
        // 왜 이렇게 해줘야하는지? -> constructor와 render는 기본이기 때문에 this가 바인딩 돼있는건가?
    }

    handleClick() {
        this.setState({
            value: this.state.value + 1
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.value}</h2>
                <button onClick={this.handleClick}>Press Me</button>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Counter/>
        );
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);
