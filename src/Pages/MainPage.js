import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import SettingModal from '../components/SettingModal/SettingModal';
import GooLogout from '../components/oauth/GooLogout';

const MainPage = ({ userInfo, addBucket, addInfo }) => {
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

    const onClick = () => {
        console.log(userInfo)
    }

    const putInfo = () => {
        addInfo({
            nickName: 'nickName',
            sex: 'sex',
            birth: 'date',
            sleep: 'sleep',
            smoking: 'smoking',
            alcohol: 'alcohol',
        })
    }
    return (
        <div>
            <SettingModal />
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
            <button onClick={onClick}>스토어 조회</button>
            <button onClick={putInfo}>스토어 state 변경</button>
            <GooLogout />
        </div>
    );
};

function mapStateToProps(state) {
    return { userInfo: state };
}

function mapDispatchToProps(dispatch) {
    return {
        addBucket: bucket => dispatch(actionCreators.addBucket(bucket)),
        addInfo: (info) => dispatch(actionCreators.addInfo(info))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);