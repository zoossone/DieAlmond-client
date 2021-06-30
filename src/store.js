import { createStore } from "redux";

const INFO = 'INFO';
const ADD = 'ADD';
const DELETE = 'DELETE';

const addBucket = {
    type: ADD,
    bucket
};

const deleteBucket = {
    type: DELETE,
    id
};

const addInfo = {
    type: INFO,
    info
};


/**
 * 닉네임: name
 * 성별: age
 * 나이: age
 * 잠: sleep
 * 담배: smoking
 * 술: alcohol
 * 위 모든것을 객체에 담을 수 있다
 * 버킷리스트[] - 새로운 스토어가 필요? list: [{bucket:"", id: Date.now()}, {}, {}]
 */


const reducer = (state = {}, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                list: [
                    {
                        bucket: action.bucket, id: Date.now()
                    },
                    ...state.list
                ]
            };
        case DELETE:
            return {...state,
                list: [state.list.map( b => b.id !== action.id)]
            };
        case INFO:
            const newInfo = action.info;
            return { 
                ...state,
                ...action.info
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;