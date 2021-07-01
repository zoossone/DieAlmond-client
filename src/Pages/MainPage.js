import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

const MainPage = ({ userInfo, addBucket }) => {
    console.log(userInfo, userInfo.list);
    const [bucket, setBucket] = useState('');

    const onChange = (e) => {
        setBucket(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        addBucket(bucket);
        setBucket('');
    }

    return (
        <div>
            이곳은 메인페이지 입니당
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} value={bucket} />
                <button>제출</button>
                <div>{userInfo.nickname}</div>
                <ul>
                    {userInfo.list.map((el) => {
                        return <li key={el.id}>{el.bucket}</li>
                    })}
                </ul>
            </form>
        </div>
    );
};

function mapStateToProps(state) {
    return { userInfo: state };
}

function mapDispatchToProps(dispatch) {
    return {
        addBucket: bucket => dispatch(actionCreator.addBucket(bucket))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);