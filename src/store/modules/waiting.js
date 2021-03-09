// redux-actions 의 createAction() 사용
import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "waiting/CHANGE_INPUT"; // 인풋 값 변경 문자열 상태의 값을 받아와야
const CREATE = "waiting/CREATE"; // 명단에 이름 추가 문자열 상태의 값을 받아와야
const ENTER = "waiting/ENTER"; // 입장 아이템의 id 값을 받아와야
const LEAVE = "waiting/LEAVE"; // 나감 아이템의 id 값을 받아와야

/*
// **** FSA 규칙을 따르는 액션 생성 함수 정의
// 방법1
export const changeInput = (text) => ({ type: CHANGE_INPUT, payload: text });
export const create = (text) => ({ type: CREATE, payload: text });
export const enter = (id) => ({ type: ENTER, payload: id });
export const leave = (id) => ({ type: LEAVE, payload: id });
*/

let id = 3;
// 방법2 redux-actions 의 createAction() 사용해서 액션 생성 / 생략되더라도 ({ type : ? , payload : param}) 으로 알아서 들어감
export const changeInput = createAction(CHANGE_INPUT, (text) => text);
export const create = createAction(CREATE, (text) => ({ text, id: id++ })); // 리듀서는 순수함수여야 한다.
export const enter = createAction(ENTER, (id) => id);
export const leave = createAction(LEAVE, (id) => id); // 두번째 param도 생략가능하지만 헷갈리기때문에 X

// 초기 상태 정의
const initialState = {
  input: "",
  list: [
    {
      id: 0,
      name: "홍길동",
      entered: true
    },
    {
      id: 1,
      name: "콩쥐",
      entered: false
    },
    {
      id: 2,
      name: "팥쥐",
      entered: false
    }
  ]
};

// handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false
      })
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map((item) =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      )
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter((item) => item.id !== action.payload)
    })
  },
  initialState
);
