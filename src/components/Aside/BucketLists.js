import React,{useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';

const BucketLists = ({userInfo}) => {

    const history = useHistory();    

    const onClick = () => {
        if(userInfo.email){
            history.push('/bucket')
        } else if (window.confirm('로그인하실래요?')){
            history.push('/')
        }
    }

    return (
        <div>
            {userInfo.list === undefined || userInfo.list.length === 0 ? 
            <button onClick={onClick}>버킷리스트 가기</button>
            :
            <ul>
                {userInfo.list.filter(e => e.isChecked === false).map(e => <li key={e.id}>{e.bucketName}</li>)}
            </ul>}
            
        </div>
    );
};

export default BucketLists;