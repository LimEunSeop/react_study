import * as types from '../actions/ActionTypes'; // 사용할 action types를 불러온다

// Reducer의 초기상태를 정한다. --> reducer가 받아들일 이전상태. 처음이 있어야하니까
const initialState = {
    number: 0
};

export default function counter(state = initialState, action) {

    // 액션에 따라서 어떤 작업을 할 것인지
    switch (action.type) {
        case types.INCREMENT:
            return { ...state, number: state.number + 1 }; // 복사할 객, 변경할 값
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            }
        default:
            return state;
    }
}
