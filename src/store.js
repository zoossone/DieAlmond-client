import { createStore } from "redux";

const INFO = 'INFO';
const ADD = 'ADD';
const DELETE = 'DELETE';
const RESET = 'RESET';

const addBucket = (bucket) => {
    return {
        type: ADD,
        bucket
    }
};

const deleteBucket = (id) => {
    return {
        type: DELETE,
        id
    }
};

const addInfo = (info) => {
    return {
        type: INFO,
        info
    }
};

const resetInfo = () => {
    return {
        type: RESET,
    }
}


/**
 * 닉네임: nickname
 * 성별: gender
 * 나이: age
 * 잠: sleep
 * 담배: smoke
 * 술: alcohol
 * 기대여명: dead
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
            return {
                ...state,
                list: [state.list.map(b => b.id !== action.id)]
            };
        case INFO:
            return {
                ...state,
                ...action.info
            };
        case RESET:
            return {}
        default:
            return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    addBucket,
    deleteBucket,
    addInfo,
    resetInfo
}

export default store;