import { createStore } from 'redux';

const ADD = 'ADD';
const DELETE = 'DELETE'

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

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{bucket: action.bucket, id: Date.now()}, ...state];
        case DELETE:
            return state.map(bket => bket.id !== action.id);
        default:
            return state;
    }
}

const BucketStore = createStore(reducer);

export const actionCreator = {
    addBucket,
    deleteBucket
}

export default BucketStore;